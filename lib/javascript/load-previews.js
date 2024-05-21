/*
 * There are currently the following url parameters supported:
 * - preview-page: The page of the preview. The first page is 0.
 * - tag: Filter by tags. Multiple tags are possible.
 * - cos: Filter by course of study. Possible values are "minf" and "musk".
 * - min-date: Filter by date. Only show content newer than this date.
 * - max-date: Filter by date. Only show content older than this date.
 *
 */


const maxCountPerPage = 9;

const previewGrid = document.getElementById("preview-grid");
let json = [];
let lastColumnCount;
let previews = [];
let pageCount = 0;


checkParams();
fetch(new URL("../../resources/content.json", document.currentScript.src).href)
    .then(json => json.json())
    .then(data => json = Array.isArray(data) ? data : [])
    .then(() => json = addDummyData(json))
    .then(load)
    .catch(console.error);
window.addEventListener('resize', previewSort);

function update(url) {
    window.history.pushState({}, '', url);
    load();
    window.location.href = "#preview-section";
}

function toggleFilter(key, value, override = false) {
    const url = new URL(window.location);
    const buttons = document.querySelectorAll(`button[data-param="${key}"]`);
    if (override) url.searchParams.delete(key);
    if (url.searchParams.has(key, value)) {
        url.searchParams.delete(key, value);
        let noneActive = true;
        buttons.forEach(b => {
            if (b.dataset.val === value) b.classList.remove('active');
            if (b.dataset.val && b.classList.contains('active')) noneActive = false;
        });
        buttons.forEach(b => {
            if (!b.dataset.val && noneActive) b.classList.remove('active');
        });
    } else {
        url.searchParams.append(key, value);
        buttons.forEach(b => {
            if (b.dataset.val === value || !b.dataset.val) b.classList.add('active');
        });
    }
    url.searchParams.set('preview-page', '0');
    update(url);
}

function setDateFilter(key, value) {
    const url = new URL(window.location);
    const button = document.querySelector(`button[data-param="date"]`);
    button.classList.add('active');
    url.searchParams.set(key, value);
    url.searchParams.set('preview-page', '0');
    update(url);
}

function removeFilter(key) {
    const url = new URL(window.location);
    if (key.includes('date')) {
        const button = document.querySelector(`button[data-param="date"]`);
        // check if any date filter is active
        const active =
            (url.searchParams.has('max-date') && key === 'min-date') ||
            (url.searchParams.has('min-date') && key === 'max-date');
        if (!active) {
            button.classList.remove('active');
        }
    }
    url.searchParams.delete(key);
    url.searchParams.set('preview-page', '0');
    update(url);
}

function previewSort(force = false) {
    if (previews.length === 0) return;

    let columns = 1;
    if (window.innerWidth >= 930) columns = 3;
    else if (window.innerWidth >= 600) columns = 2;

    if (columns === lastColumnCount && !force) return;

    lastColumnCount = columns;
    previewGrid.innerHTML = '';
    for (let i = 0; i < columns; i++) {
        let previewColumn = document.createElement('div');
        previewColumn.classList.add('preview-column');
        for (let j = 0; j < previews.length; j++) {
            if (j % columns === i) {
                previewColumn.appendChild(previews[j]);
            }
        }
        previewGrid.appendChild(previewColumn);
    }

    let containers = previews.map(preview => preview.querySelector('.preview-img'));
    let width = containers[0].offsetWidth;

    containers.forEach(container => {
        container.style.minHeight = width / (16 / 9) + 'px';
        container.style.maxHeight = width / (2 / 3) + 'px';
    });
}

function getPageNumber(val) {
    if (val === null) return 0;
    val = parseInt(val);
    if (isNaN(val) || val < 0) return 0;
    return val;
}

function navigateTo(page, offset = false) {
    const url = new URL(window.location);
    if (offset) page += getPageNumber(url.searchParams.get('preview-page'));
    url.searchParams.set('preview-page', page);
    update(url);
}

function load() {
    previewGrid.innerHTML = '';

    const params = new URLSearchParams(window.location.search);
    const previewPage = getPageNumber(params.get('preview-page'));
    const tags = params.getAll('tag').map(i => i.toLowerCase());
    const minDate = params.get('min-date');
    const maxDate = params.get('max-date');
    const cos = params.getAll('cos');
    const filterMinf = cos.includes('minf');
    const filterMusk = cos.includes('musk');
    const search = params.get('q');

    let data = json.filter(item =>
        !(
            (filterMinf && !filterMusk && !item.minf) ||
            (!filterMinf && filterMusk && !item.musk) ||
            (minDate && new Date(item.date) <= new Date(minDate)) ||
            (maxDate && new Date(item.date) >= new Date(maxDate + '-12-31')) ||
            (tags.length > 0 && !item.tags.map(i => i.toLowerCase()).some(i => tags.includes(i)))
        )
    );

    if (search) {
        const s = search.toLowerCase().trim();
        data = data.filter(item =>
            item.title.toLowerCase().includes(s) ||
            item.author?.toLowerCase().includes(s) ||
            String(item.date).toLowerCase().includes(s) ||
            item.tags.map(i => i.toLowerCase()).some(i => i.includes(s)) ||
            item.text_short?.toLowerCase().includes(s)
        );
    }

    pageCount = Math.ceil(data.length / maxCountPerPage);
    data = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(previewPage * maxCountPerPage, (previewPage + 1) * maxCountPerPage);

    previews = data.map((item, i) => {
        const preview = document.createElement("a");
        preview.classList.add("preview");
        if (item.minf && !item.musk) preview.classList.add("minf");
        if (item.musk && !item.minf) preview.classList.add("musk");
        preview.href = `javascript:goTo('./pages/beitrag.html?id=${item.id}')`;
        preview.tabIndex = 2 + i;

        const img = document.createElement("img");
        img.classList.add("preview-img");
        img.alt = item.title;
        const titleImg = item.images.find(i => i.id === item.title_image);
        if (!titleImg && item.title_image === -1) {
            img.classList.add("dummy");
            img.src = item.title_image_url;
        } else if (!titleImg) {
            console.error(`No title image found for ${item.title}`);
        } else {
            img.src = `resources/${titleImg.url}`;
        }

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("preview-img-wrapper");
        imgWrapper.appendChild(img);

        const headline = document.createElement("p");
        headline.classList.add("preview-title");
        headline.classList.add("anchor-arrow");
        headline.innerText = item.title;

        preview.appendChild(imgWrapper);
        preview.appendChild(headline);

        return preview;
    });

    previewSort(true);


    const prevPageButton = document.getElementById("prev-page-button");
    const firstPageButton = document.getElementById("first-page-button");
    const lastPageButton = document.getElementById("last-page-button");
    const nextPageButton = document.getElementById("next-page-button");
    const currentPageIndicator = document.getElementById("current-page-indicator");

    currentPageIndicator.innerText = 'Seite ' + (previewPage + 1);
    firstPageButton.innerText = '1';
    firstPageButton.disabled = previewPage === 0;
    lastPageButton.innerText = pageCount;
    lastPageButton.disabled = previewPage === pageCount - 1;
    prevPageButton.disabled = previewPage === 0;
    nextPageButton.disabled = previewPage === pageCount - 1;
}

function checkParams() {
    let params = new URLSearchParams(window.location.search);
    // check site parameter
    const site = params.get('site');
    if (site && !params.has('cos')) {
        params.set('cos', site);
        window.history.replaceState({}, '', '?' + params.toString());
    }
    // check filter toggle buttons
    const buttons = document.querySelectorAll('button[data-param]');
    buttons.forEach(button => {
        const p = button.dataset.param;
        if (button.dataset.val) {
            button.addEventListener('click', () => toggleFilter(p, button.dataset.val));
            if (params.has(p, button.dataset.val)) {
                button.classList.add('active');
            }
        } else if (p === 'date' && (params.has('min-date') || params.has('max-date')) || params.has(p)) {
            button.classList.add('active');
        }
    });
    // check search param and reset page number
    if (params.has('q')) {
        params.set('preview-page', '0');
        window.history.replaceState({}, '', '?' + params.toString());
        window.location.href = "#preview-section";
    }
}

function addDummyData(data) {
    const dummyAmount = 50;
    let dummyData = [];
    const getDate = () => {
        // return a date inside the range of the current data
        let minDate;
        let maxDate;
        data.forEach(item => {
            const date = new Date(item.date);
            if (!minDate || date < minDate) minDate = date;
            if (!maxDate || date > maxDate) maxDate = date;
        });
        return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    }
    const getTags = () => {
        const tags = [
            'Events',
            'Fotografie',
            'Games',
            'Coding',
            'Audiovisuell',
            'Web',
            'Grafik',
            'Animation',
        ];
        // randomly select a few tags
        const tagAmount = Math.floor(Math.random() * tags.length);
        let tagList = [];
        for (let i = 0; i < tagAmount; i++) {
            let tag;
            do {
                tag = tags[Math.floor(Math.random() * tags.length)];
            } while (tagList.includes(tag));
            tagList.push(tag);
        }
        return tagList;
    }
    const getSize = () => Math.floor(Math.random() * 300) + 500;
    for (let i = 0; i < dummyAmount; i++) {
        const item = {
            id: -i - 1,
            title: `Hier würde der Beitrags-Title${Math.random() > 0.5 ? ', gerne auch mal länger, ' : ''} stehen`,
            title_image: -1,
            title_image_url: `https://picsum.photos/seed/${i}/${getSize()}/${getSize()}`,
            date: getDate().toISOString(),
            minf: Math.random() < 0.5,
            musk: Math.random() < 0.5,
            tags: getTags(),
            images: []
        };
        dummyData.push(item);
    }

    return data.concat(dummyData);
}
