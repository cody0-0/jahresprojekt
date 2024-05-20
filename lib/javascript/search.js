checkIndicator(new URLSearchParams(window.location.search));

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
    checkIndicator(searchParams);
});
document.getElementById('search-indicator').addEventListener('click', () => {
    const url = new URL(window.location);
    url.searchParams.delete('q');
    window.location.href = url.href;
});

function checkIndicator(searchParams = null) {
    const searchIndicator = document.getElementById('search-indicator');
    const searchIndicatorText = document.getElementById('search-indicator-text');
    if (!searchParams) searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('q')) {
        searchIndicator.style.display = 'flex';
        searchIndicatorText.textContent = searchParams.get('q');
    } else {
        searchIndicator.style.display = 'none';
    }
}
