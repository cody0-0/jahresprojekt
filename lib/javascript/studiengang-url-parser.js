const studiengang = new URLSearchParams(window.location.search).get('site');

const headTitle = document.querySelector('head title');
switch (studiengang) {
    case 'minf':
        headTitle.textContent = 'Medieninformatik';
        document.querySelector('html').classList.add('minf');
        break;
    case 'musk':
        headTitle.textContent = 'Medien- und Spielekonzeption';
        document.querySelector('html').classList.add('musk');
        break;
    default:
        headTitle.textContent = 'Medien Hochschule Harz';
        break;
}