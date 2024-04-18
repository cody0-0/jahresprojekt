window.addEventListener('resize' , event => {
    previewSort();
});

let lastColumnCount;
let previews;

function initPreviewSort() {
    previews = document.querySelectorAll('.preview');
    previewSort();
}


function previewSort() {
    let container = document.querySelector('.previews .content-grid')
    
    if (previews.length == 0) {
        return;
    }
    let columns = 1;
    if (window.innerWidth >= 600) {
        columns = 2;
    } 
    if (window.innerWidth >= 930) {
        columns = 3;
    }

    if (columns === lastColumnCount) {
        return;
    }

    lastColumnCount = columns;
    container.innerHTML = '';
    for (let i = 0; i < columns; i++) {
        let previewColumn = document.createElement('div');
        previewColumn.classList.add('preview-column');
        for (let j = 0; j < previews.length; j++) {
            if (j % columns == i) {
                previewColumn.appendChild(previews[j]);
            }
        }
        container.appendChild(previewColumn);
    }
}