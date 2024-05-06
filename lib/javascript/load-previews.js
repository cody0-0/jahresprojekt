/*
 * There are currently the following url parameters supported:
 * - preview-page: The page of the preview. The first page is 0.
 * - tag: Filter by tags. Multiple tags are possible.
 * - site: Filter by site. Possible values are "minf" and "musk".
 * - course: Filter by course. Possible values are "minf" and "musk".
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

window.addEventListener('resize', previewSort);

function update(url) {
    window.history.pushState({}, '', url);
    load();
    window.location.href = "#preview-section";
}

function toggleFilter(key, value, button) {
    const url = new URL(window.location);
    if (url.searchParams.has(key, value)) {
        button.classList.remove('active');
        url.searchParams.delete(key, value);
    } else {
        button.classList.add('active');
        url.searchParams.append(key, value);
    }
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
    const tags = params.getAll('tag');
    const minDate = params.get('min-date');
    const maxDate = params.get('max-date');
    const course = params.get('course');
    const site = params.get('site');

    let data = json.filter(item => {
        return !(
            ((site === "minf" || course === "minf") && !item.minf) ||
            ((site === "musk" || course === "musk") && !item.musk) ||
            (minDate && new Date(item.date) < new Date(minDate)) ||
            (maxDate && new Date(item.date) > new Date(maxDate)) ||
            (tags.length > 0 && !item.tags.map(i => i.toLowerCase()).some(i => tags.includes(i)))
        );
    });

    pageCount = Math.ceil(data.length / maxCountPerPage);
    data = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(previewPage * maxCountPerPage, (previewPage + 1) * maxCountPerPage);

    previews = data.map((item, i) => {
        const preview = document.createElement("a");
        preview.classList.add("preview");
        if (item.minf && !item.musk) preview.classList.add("minf");
        if (item.musk && !item.minf) preview.classList.add("musk");
        preview.href = "javascript:goTo('./pages/" + (i === 0 ? "beitrag" : "404") + ".html')";

        const img = document.createElement("img");
        img.classList.add("preview-img");
        img.alt = item.title;
        img.src = "resources/imgs/content/" + item.prev_img;

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("preview-img-wrapper");
        imgWrapper.appendChild(img);

        const headline = document.createElement("h3");
        headline.classList.add("preview-title");
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

window.addEventListener('DOMContentLoaded', () => {
    fetch("../../resources/content.json")
        .then(json => json.json())
        .then(data => json = Array.isArray(data) ? data : [])
        .then(load)
        .catch(console.error);
});
