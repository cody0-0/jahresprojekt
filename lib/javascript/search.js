const searchUrl = new URL('../../index.html', document.currentScript.src)
document.getElementById('preview-search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchParams = new URLSearchParams(formData);
    searchUrl.search = window.location.search;
    // merge the search parameters
    for (const [key, value] of searchParams) {
        searchUrl.searchParams.set(key, value);
        searchUrl.hash = 'preview-section';
    }
    window.location.href = searchUrl.href;
});
