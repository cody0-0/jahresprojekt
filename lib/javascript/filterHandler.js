// TODO: Set toggle button active state when setting filter
// FIXME: Change filter param from min/max-time to min/max-date

document.querySelectorAll('.wheel-select').forEach((elem) => {
    elem.addEventListener('scrollend', (e) => {
        restrictTimeSelection();
        if(elem.id === 'min-time-select') {
            toggleFilter('min-time', getSelectedValue(elem), elem);
        } else if(elem.id === 'max-time-select') {
            toggleFilter('max-time', getSelectedValue(elem), elem);
        }
    });
});

function restrictTimeSelection() {
    console.log('restricting time selection');
    let minTimeSelect = document.querySelector('#min-time-select');
    let maxTimeSelect = document.querySelector('#max-time-select');
    let minTimeOptions = minTimeSelect.querySelectorAll('li');
    let maxTimeOptions = maxTimeSelect.querySelectorAll('li');
    let minTimeIndex = Array.from(minTimeOptions).indexOf(minTimeSelect.querySelector('li.selected')); 
    let maxTimeIndex = Array.from(maxTimeOptions).indexOf(maxTimeSelect.querySelector('li.selected'));
    for (let i = 0; i < minTimeOptions.length; i++) {
        console.log("min", i, minTimeOptions.length, maxTimeIndex);
        if (i > maxTimeIndex) {
            minTimeOptions[i].classList.add('disabled');
        } else {
            minTimeOptions[i].classList.remove('disabled');
        }
    }
    for (let i = 0; i < maxTimeOptions.length; i++) {
        console.log("max", i, maxTimeOptions.length, minTimeIndex);
        if (i < minTimeIndex) {
            maxTimeOptions[i].classList.add('disabled');
        } else {
            maxTimeOptions[i].classList.remove('disabled');
        }
    }
}

function getSelectedValue(elem) {
    return elem.querySelector('.selected').value;
}