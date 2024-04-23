document.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
});