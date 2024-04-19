let prevscroll = 0;

window.addEventListener('scroll', event => {
    upScrollSnap();
    prevscroll = window.scrollY;
});

/**
 * Enables snapping to specific page elements when scrolling up.
 * (or prevents it when scrolling down)
 * 
 * Adds class 'active' to elements with the class 'up-scroll-snap' when the user scrolls up.
 * Top buffer of 20px is added to prevent snapping to a snap point in close proximity when the user is at the very top of the page.
 * Snapping is handled by CSS.
 *  */ 
function upScrollSnap() {
    let points = document.querySelectorAll('.up-scroll-snap');
    if(window.scrollY > 20 && prevscroll > window.scrollY) {
        points.forEach(point => {
            point.classList.add('active');
        })
    } else {
        points.forEach(point => {
            point.classList.remove('active');
        })
    }
}

/**
 * Scrolles to a specific position on the page. (Indended to be used on load)
 * 
 * If the user has already scrolled, the function returns.
 * If the URL contains a hash, the function returns to prevent overriding the scrolling to an anker.
 * If the yOffset is negative, the function returns.
 * @param {number} yOffset - The offset from the top of the page in pixels or (if between 0 and 100) percentage of the window height.
 * */
function startPosition(yOffset) {
    if(sessionStorage.getItem('scrolled') !== null) {
        return
    }
    if(window.URL.toString().includes('#') || yOffset < 0) {
        return;
    }
    if(yOffset === undefined || yOffset === null) {
        yOffset = 0;
    }
    if(yOffset <= 100) {
        yOffset = window.innerHeight * (yOffset / 100);
    }
    window.scrollTo(
        {
            top: yOffset,
            behavior: 'smooth'
        });
    sessionStorage.setItem('scrolled', 'true');
}
