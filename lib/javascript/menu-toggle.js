document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', event => {
        toggleActiveState(button.getAttribute('aria-controls'));
    });
});

function toggleActiveState(id) {
    document.getElementById(id).classList.toggle('active');
}