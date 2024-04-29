const previewGrid = document.getElementById("preview-grid");
let urlParameters = new URLSearchParams(window.location.search);
let lastParameters = urlParameters.toString();
let lastColumnCount;
let previews = [];

window.addEventListener('resize', previewSort);
window.navigation.addEventListener('navigate', event => {
    const url = new URL(event.destination.url);
    urlParameters = new URLSearchParams(url.search);
    if (urlParameters.toString() !== lastParameters) {
        load();
        lastParameters = urlParameters.toString();
    }
});


function appendURLParameter(key, value) {
    let url = new URL(window.location);
    url.searchParams.append(key, value);
    window.history.pushState({}, '', url);
}

function setURLParameter(key, value) {
    let url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
}

function removeURLParameter(key) {
    let url = new URL(window.location);
    url.searchParams.delete(key);
    window.history.pushState({}, '', url);
}

function toggleURLParameter(key, value) {
    let url = new URL(window.location);
    if (url.searchParams.has(key, value)) {
        url.searchParams.delete(key, value);
    } else {
        url.searchParams.append(key, value);
    }
    window.history.pushState({}, '', url);
}

function previewSort(force = false) {
    if (previews.length === 0) {
        return;
    }
    let columns = 1;
    if (window.innerWidth >= 600) {
        columns = 2;
    }
    if (window.innerWidth >= 930) {
        columns = 3;
    }

    if (columns === lastColumnCount && !force) {
        return;
    }

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
    previews = [];

    fetch("../../resources/content.json")
        .then(json => json.json())
        .then(data => Array.from(data).forEach(item => {

            // Filter by tags, site and date range
            const tags = urlParameters.getAll('tag');
            const minDate = urlParameters.get('min-date');
            const maxDate = urlParameters.get('max-date');
            if (
                (urlParameters.get('site') === "minf" && !item.minf) ||
                (urlParameters.get('site') === "musk" && !item.musk) ||
                (minDate && new Date(item.date) < new Date(minDate)) ||
                (maxDate && new Date(item.date) > new Date(maxDate)) ||
                (tags.length > 0 && !item.tags.map(i => i.toLowerCase()).some(i => tags.includes(i)))
            ) {
                return;
            }

            const preview = document.createElement("a");
            preview.classList.add("preview");
            preview.id = "content-" + item.id;
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

            // TODO: add stamp for Studiengang

            preview.appendChild(img);
            preview.appendChild(headline);
            previews.push(preview);

        }))
        .then(() => previewSort(true))
        .catch(console.error);
}

load();