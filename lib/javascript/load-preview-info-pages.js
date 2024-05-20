(() => {
    const path = window.location.pathname;
    const minf = path.includes('minf');
    const musk = path.includes('musk');
    if (!(minf || musk)) return;
    fetch(new URL('../../resources/content.json', document.currentScript.src).href)
        .then(json => json.json())
        .then(data => {
            const recCont = document.getElementById('recommendation-container');
            const _data = data.filter(item => (minf ? item.minf : true) && (musk ? item.musk : true));

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
        })
        .catch(console.error);
})();