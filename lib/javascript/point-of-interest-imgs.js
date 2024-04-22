function initPOI() {
    let images = document.querySelectorAll('img');

    images.forEach(img => {
        img.style.setProperty('--poi-x', `${img.dataset.poiX}`)
        //console.log(`data: ${img.dataset.poiY}`)
        img.style.setProperty('--poi-y', `${img.dataset.poiY}`)
        //console.log(`attribute: ${img.style.getPropertyValue('--poi-y')}`)
    });
}