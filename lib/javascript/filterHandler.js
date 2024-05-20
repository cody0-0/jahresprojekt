document.querySelectorAll('.date-filter-select').forEach((elem) => {
    let event = 'change';
    if (elem.classList.contains('wheel-select')) {
        event = 'scrollend';
    }

    elem.addEventListener(event, (e) => {
        document.querySelectorAll('.wheel-select').forEach((wheelElem) => {
            selectWheelItem(wheelElem, event);
        });
        let value = elem.classList.contains('wheel-select') ? elem.getAttribute('value') : elem.value;
        let filter = elem.getAttribute("name");

        removeFilter(filter);
        if (filter === 'min-date' && value > elem.getAttribute('min')
            || filter === 'max-date' && value < elem.getAttribute('max')) {
            setDateFilter(filter, value);
        }

        restrictDateSelection(`.date-filter-select[name="${filter}"]:not(#${elem.id})`, 'value', value);
        if (filter === 'min-date') restrictDateSelection(`.date-filter-select[name="max-date"]`, 'min', value);
        else if (filter === 'max-date') restrictDateSelection(`.date-filter-select[name="min-date"]`, 'max', value);

        document.querySelectorAll('.wheel-select').forEach((wheelElem) => {
            restrictWheelSelection(wheelElem);
        });

    });
});

(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let minMinDate = '2015';
    let maxMaxDate = '2024';
    let minDate = urlParams.get('min-date');
    let maxDate = urlParams.get('max-date');
    minDate = minDate === undefined
    || minDate === null
    || minDate.trim().length == 0
    || minDate < minMinDate
        ? minMinDate : minDate;
    maxDate = maxDate === undefined
    || maxDate === null
    || maxDate.trim().length == 0
    || maxDate > maxMaxDate
        ? maxMaxDate : maxDate;
    restrictDateSelection(`.date-filter-select[name="min-date"]`, 'value', minDate);
    restrictDateSelection(`.date-filter-select[name="max-date"]`, 'value', maxDate);
    restrictDateSelection(`.date-filter-select[name="min-date"]`, 'min', minMinDate);
    restrictDateSelection(`.date-filter-select[name="min-date"]`, 'max', maxDate);
    restrictDateSelection(`.date-filter-select[name="max-date"]`, 'min', minDate);
    restrictDateSelection(`.date-filter-select[name="max-date"]`, 'max', maxMaxDate);
    document.querySelectorAll('.wheel-select').forEach((wheelElem) => {
        selectWheelItem(wheelElem);
    });
})();

function restrictDateSelection(selector, key, value) {
    let elems = document.querySelectorAll(selector);
    elems.forEach((elem) => {
        if (key === 'value') elem.value = value;
        elem.setAttribute(key, value);
    });
}

function restrictWheelSelection(wheelElem) {
    let minVal = wheelElem.getAttribute('min');
    let maxVal = wheelElem.getAttribute('max');
    let value = wheelElem.getAttribute('value');
    let options = wheelElem.querySelectorAll('li');

    let minReached = false;
    let maxReached = false;

    /* disable all options that are not in the range */
    options.forEach((option) => {
        minReached = minReached || option.getAttribute("value") == minVal;
        if (!minReached || maxReached) {
            option.classList.add('disabled');
        } else {
            option.classList.remove('disabled');
        }
        maxReached = maxReached || option.getAttribute("value") == maxVal;
    });

    /* set the selected value 
    if the touch wheel is active, set the value of the input field (the option is already set to "selected" by the wheel)
    else set the selected class on the selected option
    */
    if (!window.getComputedStyle(document.querySelector('#date-filter-touch')).display.includes('none')) {
        options.forEach((option) => {
            if (option.getAttribute("value") == value) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }
    wheelElem.value = getSelectedValue(wheelElem);
    wheelElem.setAttribute('value', getSelectedValue(wheelElem));
}

function getSelectedValue(elem) {
    return elem.querySelector('.selected')?.getAttribute('value');
}

document.querySelectorAll('#min-date-slider, #max-date-slider').forEach((slider) => {
    let input = document.querySelector(`#${slider.id.replace('slider', 'field')}`);
    sliderToInput(slider, input);
});

function sliderToInput(slider, input) {
    slider.addEventListener('input', (e) => {
        input.value = slider.value;
    })
}