function selectWheelItem(wheelElem, fromEvent = null) {
    let children = wheelElem.querySelectorAll("li:not(.disabled)");
    let selected = 0;
    if(fromEvent === "scrollend") selected = Math.round(wheelElem.scrollTop / _getHeightOfList(wheelElem.querySelectorAll('li')) * children.length);
    else {
        children.forEach((child, index) => {
            if(child.getAttribute("value") === wheelElem.getAttribute("value")) {
                selected = index;
                child.classList.add('selected');
            } else {
                child.classList.remove('selected');
            }
        });
    }
    wheelElem.setAttribute("value", children.item(selected).getAttribute("value"));
    return children.item(selected);
}

function scrollToSelected(scrollContainerSelector) {
    setTimeout(() => {
    let wheelElem = document.querySelectorAll(scrollContainerSelector);
    wheelElem.forEach((elem) => {
        let children = elem.querySelectorAll("li:not(.disabled)");
        children.forEach((child, index) => {
            if(child.classList.contains('selected')) {
                selected = index;
            }
        })
        elem.scrollTop = selected * children.item(0).offsetHeight;
    });
    }, 10);
}

function _getHeightOfList(elem) {
    let height = 0;
    elem.forEach((child) => {
        height += child.offsetHeight;
    });
    return height;
}