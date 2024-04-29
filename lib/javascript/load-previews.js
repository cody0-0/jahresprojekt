const previewGrid = document.getElementById("preview-grid");
let lastColumnCount;
let previews = [];

window.addEventListener('resize', previewSort);
window.navigation.addEventListener('navigate', load);

function previewSort() {
    let container = document.querySelector('.previews .content-grid')

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

    if (columns === lastColumnCount) {
        return;
    }

    lastColumnCount = columns;
    container.innerHTML = '';
    for (let i = 0; i < columns; i++) {
        let previewColumn = document.createElement('div');
        previewColumn.classList.add('preview-column');
        for (let j = 0; j < previews.length; j++) {
            if (j % columns === i) {
                previewColumn.appendChild(previews[j]);
            }
        }
        container.appendChild(previewColumn);
    }
}

function load() {
    const urlParameters = new URLSearchParams(window.location.search);

    fetch("../../resources/content.json")
        .then(json => json.json())
        .then(data => Array.from(data).forEach(item => {

            // Filter by tags, site and date range
            const tags = urlParameters.getAll('tag');
            const minDate = urlParameters.get('minDate');
            const maxDate = urlParameters.get('maxDate');
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
            previewGrid.appendChild(preview);
            previews.push(preview);

        }))
        .then(previewSort)
        .catch(console.error);
}

load();