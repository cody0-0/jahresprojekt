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
let params = new URLSearchParams(window.location.search);
let lastParams = params.toString();
let lastColumnCount;
let previews = [];
let pageCount = 0;

window.addEventListener('resize', previewSort);
window.navigation.addEventListener('navigate', event => {
    const url = new URL(event.destination.url);
    params = new URLSearchParams(url.search);
    if (params.toString() !== lastParams) {
        load();
        lastParams = params.toString();
    }
});

function toggleURLParameter(key, value, button) {
    let url = new URL(window.location);
    if (url.searchParams.has(key, value)) {
        button.classList.remove('active');
        url.searchParams.delete(key, value);
    } else {
        button.classList.add('active');
        url.searchParams.append(key, value);
    }
    window.history.pushState({}, '', url);
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

function load() {
    previewGrid.innerHTML = '';

    const previewPage = ((val) => {
        if (val === null) return 0;
        val = parseInt(val);
        if (isNaN(val) || val < 0) return 0;
        return val;
    })(params.get('preview-page'));
    const tags = params.getAll('tag');
    const minDate = params.get('min-date');
    const maxDate = params.get('max-date');
    const course = params.get('course');
    const site = params.get('site');

    let data = json.filter(item => {
        return !(
            (site === "minf" || course === "minf" && !item.minf) ||
            (site === "musk" || course === "musk" && !item.musk) ||
            (minDate && new Date(item.date) < new Date(minDate)) ||
            (maxDate && new Date(item.date) > new Date(maxDate)) ||
            (tags.length > 0 && !item.tags.map(i => i.toLowerCase()).some(i => tags.includes(i)))
        );
    });

    pageCount = Math.ceil(data.length / maxCountPerPage);
    data = data.slice(previewPage * maxCountPerPage, (previewPage + 1) * maxCountPerPage);

    if (data.length === 0) {
        const noContent = document.createElement("div");
        noContent.classList.add("no-content");
        const noContentText = document.createElement("p");
        noContentText.innerText = "Es konnten leider keine Beiträge gefunden werden (°¬°)";
        noContent.appendChild(noContentText);
        previewGrid.appendChild(noContent);
    }

    previews = data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => {
        const preview = document.createElement("a");
        preview.classList.add("preview");
        if (item.minf) preview.classList.add("minf");
        if (item.musk) preview.classList.add("musk");
        preview.href = (
            item.id === 1
                ? "pages/beitrag.html"
                : "pages/404.html"
        );

        const img = document.createElement("img");
        img.classList.add("preview-img");
        img.alt = item.title;
        img.src = "resources/imgs/content/" + item.prev_img;

        const headline = document.createElement("h3");
        headline.classList.add("preview-title");
        headline.innerText = item.title;

        preview.appendChild(img);
        preview.appendChild(headline);

        return preview;
    });

    previewSort(true);
}

fetch("../../resources/content.json")
    .then(json => json.json())
    .then(data => json = Array.isArray(data) ? data : [])
    .then(load)
    .catch(console.error);
