const imgOverlay = document.getElementById('image-overlay');
const imgOverlayImg = document.getElementById('image-overlay-img');
const imgOverlayCaption = document.getElementById('image-overlay-caption');

function openImageOverlay(arg, caption) {
    let image;
    switch (typeof arg) {
        case 'string':
            image = arg;
            break;
        case 'number':
            // TODO
            break;
        case 'object':
            if (arg.dir === 'next') {
                // TODO
                // break;
            }
            if (arg.dir === 'prev') {
                // TODO
                // break;
            }
            return;
        default:
            return;
    }

    imgOverlay.classList.remove('hidden');
    imgOverlayImg.classList.remove('zoomed');
    imgOverlayImg.src = image;
    imgOverlayImg.alt = caption;
    imgOverlayCaption.textContent = caption?.trim();
}

document.addEventListener('DOMContentLoaded', () => {
    imgOverlay.addEventListener('click', () => imgOverlay.classList.add('hidden'));
    imgOverlayImg.addEventListener('click', e => {
        e.stopPropagation();
        imgOverlayImg.classList.toggle('zoomed');
    });

    const translate = (x, y) => {
        const s = 35;
        x = Math.max(Math.min(x, s), -s);
        y = Math.max(Math.min(y, s), -s);

        imgOverlayImg.style.setProperty('--_s', '3');
        imgOverlayImg.style.setProperty('--_x', -x + '%');
        imgOverlayImg.style.setProperty('--_y', -y + '%');
    }
    imgOverlayImg.addEventListener('mousemove', e => {
        if (imgOverlayImg.classList.contains('zoomed')) {
            const rect = imgOverlayImg.getBoundingClientRect();
            let x = (e.clientX - rect.left) / rect.width * 100 - 50;
            let y = (e.clientY - rect.top) / rect.height * 100 - 50;
            translate(x, y);
        }
    });
    imgOverlayImg.addEventListener('touchmove', e => {
        if (imgOverlayImg.classList.contains('zoomed')) {
            e.preventDefault();
            const rect = imgOverlayImg.getBoundingClientRect();
            let x = (e.touches[0].clientX - rect.left) / rect.width * 100 - 50;
            let y = (e.touches[0].clientY - rect.top) / rect.height * 100 - 50;
            translate(x, y);
        }
    });

    document.getElementById('image-overlay-prev').addEventListener('click', e => {
        e.stopPropagation();
        openImageOverlay({dir: 'next'});
    });
    document.getElementById('image-overlay-next').addEventListener('click', e => {
        e.stopPropagation();
        openImageOverlay({dir: 'prev'})
    });

    document.querySelectorAll('.title-img-container, .inline-img-container').forEach(imgCont => {
        const img = imgCont.querySelector('img');
        const caption = imgCont.querySelector('.caption');
        const expandButton = document.createElement('button');
        expandButton.className = 'icon-button';
        expandButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/>
            </svg>
        `;
        expandButton.onclick = () => openImageOverlay(img.src, caption?.textContent);
        imgCont.appendChild(expandButton);
        // adjust button bottom to incorporate the image caption and image container gap
        if (caption) {
            let offset = caption.offsetHeight;
            let gap = parseInt(getComputedStyle(imgCont).gap);
            expandButton.style.bottom = (offset + gap) + 'px';
        }
    });
});