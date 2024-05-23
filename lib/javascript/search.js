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
document.getElementById('search-chip')?.addEventListener('click', () => {
    const url = new URL(window.location);
    url.searchParams.delete('q');
    window.location.href = url.href;
});

function checkIndicator(searchParams = null) {
    const searchChip = document.getElementById('search-chip');
    if (!searchChip) return;
    const searchChipText = document.getElementById('search-chip-text');
    if (!searchParams) searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('q')) {
        searchChip.classList.add('active');
        searchChipText.textContent = searchParams.get('q');
    } else {
        searchChip.classList.remove('active');
    }
}
