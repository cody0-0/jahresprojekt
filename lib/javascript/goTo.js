function goTo(url) {
    const params = new URLSearchParams(window.location.search);
    const _url = new URL(url, window.location.href);
    switch (params.get('site')) {
        case 'minf':
            _url.searchParams.set('site', 'minf');
            break;
        case 'musk':
            _url.searchParams.set('site', 'musk');
            break;
        default:
            break;
    }
    window.location.href = _url.href;
}