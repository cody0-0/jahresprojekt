const studiengang = new URLSearchParams(window.location.search).get('site');

const headTitle = document.querySelector('head title');
const favicon = document.getElementById('favicon');
switch (studiengang) {
    case 'minf':
        headTitle.textContent = 'Medieninformatik';
        favicon.href = window.location.origin + '/resources/imgs/logo_minf_stamp_color.svg';
        document.querySelector('html').classList.add('minf');
        break;
    case 'musk':
        headTitle.textContent = 'Medien- und Spielekonzeption';
        favicon.href = window.location.origin + '/resources/imgs/logo_musk_stamp_color.svg';
        document.querySelector('html').classList.add('musk');
        break;
    default:
        headTitle.textContent = 'Medien Hochschule Harz';
        favicon.href = window.location.origin + '/resources/imgs/logo_medien_stamp_color.svg';
        break;
}