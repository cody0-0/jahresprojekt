const imgOverlay = document.getElementById('image-overlay');
const imgOverlayImg = document.getElementById('image-overlay-img');
const imgOverlayCaption = document.getElementById('image-overlay-caption');
const imgOverlayCounter = document.getElementById('image-overlay-counter');

imgOverlay.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

imgOverlay.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    const threshold = 100;
    if (touchendX < touchstartX - threshold) {
        openImageOverlay({dir: 'next'})
    }
    if (touchendX > touchstartX + threshold) {
        openImageOverlay({dir: 'prev'})
    }
})

function openImageOverlay(imgOrDir) {
    let img
    const images = Array.from(document.querySelectorAll('main img[data-id]'));
    if (imgOrDir.dir) {
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
        document.getElementById('image-overlay-close').focus();
    }

    imgOverlay.classList.remove('hidden');
    imgOverlayImg.classList.remove('zoomed');
    imgOverlayImg.src = img.src;
    imgOverlayImg.alt = img.alt;
    imgOverlayImg.dataset.id = img.dataset.id;
    imgOverlayCaption.textContent = img.alt;
    imgOverlayCounter.textContent = `${images.findIndex(i => i === img) + 1}/${images.length}`;
    disableScroll();
}

(() => {
    imgOverlay.addEventListener('click', () => {
        imgOverlay.classList.add('hidden');
        enableScroll();
    });
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

    // arrow keys to navigate
    window.addEventListener('keydown', e => {
        if (imgOverlay.classList.contains('hidden')) return;
        if (e.key === 'ArrowLeft') {
            openImageOverlay({dir: 'prev'});
        } else if (e.key === 'ArrowRight') {
            openImageOverlay({dir: 'next'});
        } else if (e.key === 'Escape') {
            imgOverlay.classList.add('hidden');
            enableScroll();
        }
    });
})();


//#region scroll prevention
// taken from https://stackoverflow.com/a/4770179

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {
}

const wheelOpt = supportsPassive ? {passive: false} : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

//#endregion
