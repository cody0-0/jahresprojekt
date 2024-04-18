window.addEventListener('resize' , event => {
    constrain();
});

function constrain(minAspectRatio = 16/9, maxAspectRatio = 2/3) {
    let containers = document.querySelectorAll('.preview-img');
    let width = containers[0].offsetWidth;

    containers.forEach(container => {
        container.style.minHeight = width / minAspectRatio + 'px';
        container.style.maxHeight = width / maxAspectRatio + 'px';
    });
}