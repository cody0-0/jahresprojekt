document.addEventListener('DOMContentLoaded', (e) => initPOI());

function initPOI() {
    let images = document.querySelectorAll('img');

    images.forEach(img => {
        /* get data */
        let pointX = img.dataset.poiX;
        let pointY = img.dataset.poiY;

        /* constaints */
        if(pointX === undefined || pointX === null) {
            pointX = 0.5
        }
        if(pointY === undefined || pointY === null) {
            pointY = 0.5
        }
        if(pointX < 0) {
            pointX = 0;
        }
        if(pointY < 0) {
            pointY = 0;
        }
        if(pointX > 1) {
            pointX = 1;
        }
        if(pointY > 1) {
            pointY = 1;
        }

        /* ship to css */
        img.style.setProperty('--poi-x', `${pointX}`);
        img.style.setProperty('--poi-y', `${pointY}`);
    });
}