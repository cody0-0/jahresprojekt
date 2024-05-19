(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('ck-clear')) {
        window.sessionStorage.clear();
        params.delete('ck-clear');
        window.location.search = params.toString();
    }

    const cookies = document.getElementById('cookies');
    cookies.classList.toggle('hidden', window.sessionStorage.getItem('cookies') !== null);
})();

function cookieOk() {
    window.sessionStorage.setItem('cookies', 'true');
    document.getElementById('cookies').classList.add('hidden');
}

document.addEventListener('keypress', (event) => {
    if (event.key === 'k') {
        cookieOk();
    }
});