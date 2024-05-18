const imgOverlay = document.getElementById('image-overlay');
const imgOverlayImg = document.getElementById('image-overlay-img');
const imgOverlayCaption = document.getElementById('image-overlay-caption');

function openImageOverlay(imgOrDir) {
    let img
    if (imgOrDir.dir) {
        const images = Array.from(document.querySelectorAll('main img[data-id]'));
        const current = imgOverlayImg.dataset.id;
        const index = images.findIndex(i => i.dataset.id === current);
        if (index === -1) {
            console.error(`Image with id ${current} not found`);
            return;
        }
        switch (imgOrDir.dir) {
            case 'next':
                img = images[(index + 1) % images.length];
                break;
            case 'prev':
                img = images[(index - 1 + images.length) % images.length];
                break;
            default:
                console.error(`Invalid direction ${imgOrDir.dir}`);
                return;
        }
    } else {
        img = imgOrDir;
    }

    imgOverlay.classList.remove('hidden');
    imgOverlayImg.classList.remove('zoomed');
    imgOverlayImg.src = img.src;
    imgOverlayImg.alt = img.alt;
    imgOverlayImg.dataset.id = img.dataset.id;
    imgOverlayCaption.textContent = img.alt;
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
        openImageOverlay({dir: 'prev'});
    });
    document.getElementById('image-overlay-next').addEventListener('click', e => {
        e.stopPropagation();
        openImageOverlay({dir: 'next'})
    });
});