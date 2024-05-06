document.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
});