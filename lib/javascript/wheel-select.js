document.querySelectorAll('.wheel-select').forEach((elem) => {
    elem.addEventListener('scrollend', (e) => {
        selectWheelItem(elem);
    });
});

function selectWheelItem(wheelElem) {
    let children = wheelElem.querySelectorAll("li");
    let selected = Math.round(wheelElem.scrollTop / _getHeightOfList(children) * wheelElem.querySelectorAll('li:not(.disabled)').length);
    console.log(selected, children.length, children.item(selected));
    console.log('count', wheelElem.querySelectorAll('li:not(.disabled)').length, _getHeightOfList(children) / 24);
    children.forEach((child) => {
        child.classList.remove('selected');
    });
    wheelElem.querySelectorAll('li:not(.disabled)').item(selected).classList.add('selected');
    return wheelElem.querySelectorAll('li:not(.disabled)').item(selected);
}

function _getHeightOfList(elem) {
    let height = 0;
    elem.forEach((child) => {
        height += child.offsetHeight;
    });
    return height;
}