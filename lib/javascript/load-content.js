window.addEventListener('DOMContentLoaded', () => {
    fetch("../../resources/content.json")
        .then(json => json.json())
        .then(data => Array.isArray(data) ? data : [])
        .then(find)
        .then(load)
        .then(setMoreImageOverflowCount)
        .catch(console.error);
});
window.addEventListener('resize', setMoreImageOverflowCount);

function find(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));
    const content = data.find(item => item.id === id);
    if (!content) {
        window.location.href = `javascript:goTo('./404.html')`
        throw new Error(`No content found for id ${id}`);
    }
    setRecommendations(data, content);
    setNavButtons(data, content);
    return content;
}

function load(data) {
    const title = document.getElementById('content-title');
    const titleImg = document.getElementById('content-title-img');
    const author = document.getElementById('content-author');
    const date = document.getElementById('content-date');
    const contentSection = document.getElementById('content-section');
    const gallery = document.getElementById('content-gallery');
    const tags = document.getElementById('content-tags');

    title.innerText = data.title;
    author.innerText = data.author;
    date.innerText = new Date(data.date).toLocaleDateString();

    data.images.forEach(img => {
        if (img.id === data.title_image) {
            titleImg.src = `../resources/${img.url}`;
            titleImg.alt = img.caption;
            titleImg.dataset.id = img.id;
        } else {
            const imgElement = document.createElement('img');
            imgElement.classList.add('gallery-img');
            imgElement.src = `../resources/${img.url}`;
            imgElement.alt = img.caption;
            imgElement.dataset.id = img.id;
            imgElement.addEventListener('click', () => openImageOverlay(imgElement));
            gallery.prepend(imgElement);
        }
    });

    const converter = new showdown.Converter();
    // TODO: add custom extension to generate inline images
    // converter.addExtension({})
    const text = (data.text_short || data.text_short.length >= 0) ? data.text_short : data.text_long;
    contentSection.innerHTML = converter.makeHtml(text);


    if (data.minf) {
        const tagElement = document.createElement('a');
        tagElement.href = `javascript:goTo('../index.html?course=minf')`;
        tagElement.innerText = 'MINF';
        tags.appendChild(tagElement);
    }
    if (data.musk) {
        const tagElement = document.createElement('a');
        tagElement.href = `javascript:goTo('../index.html?course=musk')`;
        tagElement.innerText = 'MUSK';
        tags.appendChild(tagElement);
    }

    data.tags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.href = `javascript:goTo('../index.html?tag=${tag}')`;
        tagElement.innerText = tag;
        tags.appendChild(tagElement);
    });
}

function setRecommendations(data, content) {
    const recCont = document.getElementById('recommendation-container');
    // exclude current content and any content that doesn't match the current site
    const params = new URLSearchParams(window.location.search);
    data = data.filter(item =>
        item.id !== content.id &&
        (params.get('site') === 'minf' ? item.minf : true) &&
        (params.get('site') === 'musk' ? item.musk : true)
    );

    // find three random recommendations that are not the current content
    const recs = [];
    while (recs.length < 3) {
        const rec = data[Math.floor(Math.random() * data.length)];
        if (!recs.includes(rec)) recs.push(rec);
    }

    recs.forEach(rec => {
        const recLink = document.createElement('a');
        recLink.classList.add('preview');
        if (rec.minf && !rec.musk) recLink.classList.add("minf");
        if (rec.musk && !rec.minf) recLink.classList.add("musk");
        recLink.href = `javascript:goTo('./beitrag.html?id=${rec.id}')`;

        const recImg = document.createElement('div');
        recImg.classList.add('preview-img-wrapper');

        const img = document.createElement('img');
        img.classList.add('preview-img');
        img.alt = rec.title;
        const titleImg = rec.images.find(i => i.id === rec.title_image);
        if (!titleImg) console.error(`No title image found for ${rec.title}`);
        else img.src = `../resources/${titleImg.url}`;

        recImg.appendChild(img);

        const recTitle = document.createElement('p');
        recTitle.classList.add('preview-title');
        recTitle.classList.add('anchor-arrow');
        recTitle.innerText = rec.title;

        recLink.appendChild(recImg);
        recLink.appendChild(recTitle);
        recCont.appendChild(recLink);
    });
}

function setNavButtons(data, content) {
    // previous and next is bound to the content data, so we need to sort the data first
    data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const index = data.findIndex(item => item.id === content.id);
    const prev = data[index - 1]
    const next = data[index + 1]

    if (prev) {
        document.getElementById('prev-post').href = `javascript:goTo('./beitrag.html?id=${prev.id}')`;
    } else {
        document.getElementById('prev-post-button').disabled = true;
    }
    if (next) {
        document.getElementById('next-post').href = `javascript:goTo('./beitrag.html?id=${next.id}')`;
    } else {
        document.getElementById('next-post-button').disabled = true;
    }
}

function setMoreImageOverflowCount() {
    const gallery = document.getElementById('content-gallery');
    // count children that have 'display: none' set
    const hidden = Array.from(gallery.children).filter(child => {
        const style = window.getComputedStyle(child);
        return style.display === 'none';
    });
    const more = document.getElementById('more-img-indicator');
    // we need to add 1 because the last image in the gallery is kinda hidden by the overlay
    more.innerText = `${hidden.length + 1}`;
}
