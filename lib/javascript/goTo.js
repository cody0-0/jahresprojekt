function goTo(url) {
    const params = new URLSearchParams(window.location.search);
    const studiengang = params.get('site');

    switch (studiengang) {
        case 'minf':
            window.location.href = url + '?site=minf';
            break;
        case 'musk':
            window.location.href = url + '?site=musk';
            break;
        default:
            window.location.href = url;
            break;
    }
}