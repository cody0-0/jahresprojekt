let data;

window.addEventListener('DOMContentLoaded', () => {
    fetch("../../resources/content.json")
        .then(json => json.json())
        .then(_data => data = (Array.isArray(_data) ? _data : []).sort((a, b) => new Date(b.date) - new Date(a.date)))
        .then(find)
        .then(load)
        .then(setNavButtons)
        .then(setRecommendations)
        .then(setMoreImageOverflowCount)
        .then(addImageExpander)
        .catch(console.error);
});
window.addEventListener('resize', setMoreImageOverflowCount);

function find() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));
    const content = data.find(item => item.id === id);
    if (!content) {
        window.location.href = `javascript:goTo('./404.html')`
        throw new Error(`No content found for id ${id}`);
    }
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

    const inlinedImages = [];
    const converter = new showdown.Converter();
    /* Custom Extension to add inline images
     *
     * Syntax: #[id]
     *
     * If an inline image is preceded by another inline image or a blockquote (>)
     * both elements will be displayed in a row
     */
    const inlineImageExtension = {
        type: 'lang',
        regex: /#\[(\d+)]/g,
        replace: (raw, id) => {
            const img = data.images.find(i => i.id === Number(id));
            if (!img) {
                console.error(`No image found for id ${id}`);
                return raw;
            }
            inlinedImages.push(img.id);
            return `
                <figure class="inline-img-container">
                    <div class="inline-img-wrapper">
                        <img src="../resources/${img.url}" alt="${img.caption}" data-id="${img.id}">
                        <button class="icon-button expand-button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                                <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/>
                            </svg>
                        </button>
                    </div>
                    <figcaption class="caption">${img.caption}</figcaption>
                </figure>
            `.trim();
        }
    }
    converter.addExtension(inlineImageExtension);
    const text = (data.text_short || data.text_short.length >= 0) ? data.text_short : data.text_long;
    contentSection.innerHTML = converter.makeHtml(text);

    gallery.querySelectorAll('img').forEach(img => img.remove());
    data.images.forEach(img => {
        if (img.id === data.title_image) {
            titleImg.src = `../resources/${img.url}`;
            titleImg.alt = img.caption;
            titleImg.dataset.id = img.id;
        } else if (!inlinedImages.includes(img.id)) {
            const imgElement = document.createElement('img');
            imgElement.classList.add('gallery-img');
            imgElement.src = `../resources/${img.url}`;
            imgElement.alt = img.caption;
            imgElement.dataset.id = img.id;
            imgElement.addEventListener('click', () => openImageOverlay(imgElement));
            gallery.prepend(imgElement);
        }
    });

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

    tags.querySelectorAll('a').forEach(tag => tag.remove());
    data.tags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.href = `javascript:goTo('../index.html?tag=${tag}')`;
        tagElement.innerText = tag;
        tags.appendChild(tagElement);
    });

    return data.id;
}

function setNavButtons(id) {
    // previous and next is bound to the content data, so we need to sort the data first
    const index = data.findIndex(item => item.id === id);
    const prev = data[index - 1]
    const next = data[index + 1]

    if (prev) document.getElementById('prev-post').href = `javascript:loadPost(${prev.id})`;
    else document.getElementById('prev-post').removeAttribute('href');
    if (next) document.getElementById('next-post').href = `javascript:loadPost(${next.id})`;
    else document.getElementById('next-post').removeAttribute('href');
    document.getElementById('prev-post-button').disabled = !prev;
    document.getElementById('next-post-button').disabled = !next;

    return id;
}

function setRecommendations(id) {
    const recCont = document.getElementById('recommendation-container');
    recCont.querySelectorAll('a').forEach(a => a.remove());
    // exclude current content and any content that doesn't match the current site
    const params = new URLSearchParams(window.location.search);
    const _data = data.filter(item =>
        item.id !== id &&
        (params.get('site') === 'minf' ? item.minf : true) &&
        (params.get('site') === 'musk' ? item.musk : true)
    );

    // find three random recommendations that are not the current content
    const recs = [];
    while (recs.length < 3) {
        const rec = _data[Math.floor(Math.random() * _data.length)];
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

    return id;
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

function addImageExpander() {
    document.querySelectorAll('.expand-button').forEach(button => {
        const parent = button.parentElement;
        const img = parent.querySelector('img');
        button.addEventListener('click', () => openImageOverlay(img));
    });
}

// noinspection JSUnusedGlobalSymbols
function loadPost(id) {
    const url = new URL(window.location);
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url);
    try {
        const content = find();
        id = load(content);
        setNavButtons(id);
        setRecommendations(id);
        setMoreImageOverflowCount();
        addImageExpander();
    } catch (e) {
        console.error(e);
    }
    window.location.href = '#content-title-section';
}
