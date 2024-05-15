const imgOverlay = document.getElementById('image-overlay');
const imgOverlayImg = document.getElementById('image-overlay-img');

function openImageOverlay(arg) {
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
            if (arg instanceof HTMLElement && arg.classList.contains('image-overlay-caller')) {
                image = arg.querySelector('img').src;
                break;
            }
            return;
        default:
            return;
    }

    imgOverlay.classList.remove('hidden');
    imgOverlayImg.classList.remove('zoomed');
    imgOverlayImg.src = image;
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

    document.querySelectorAll('.image-overlay-caller').forEach(caller => {
        caller.addEventListener('click', () => openImageOverlay(caller));
    });

    document.getElementById('image-overlay-prev').addEventListener('click', e => {
        e.stopPropagation();
        openImageOverlay({dir: 'next'});
    });
    document.getElementById('image-overlay-next').addEventListener('click', e => {
        e.stopPropagation();
        openImageOverlay({dir: 'prev'})
    });
});