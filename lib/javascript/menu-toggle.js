window.addEventListener('resize', () => activateHamburgerOnResize('expanded-hamburger', 930));

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        toggleActiveState(button.getAttribute('aria-controls'), button.dataset.focusNext);
    });
});

function toggleActiveState(selector, setFocusOn = null) {
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.toggle('active');
    });
    miesSchlechteLoesung(selector);
    if(setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn)?.focus();
    }
}

function addActiveState(selector, setFocusOn = null) {
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.add('active');
    });
    if(setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn)?.focus();
    }
}

// noinspection JSUnusedGlobalSymbols
function removeActiveState(selector, setFocusOn = null) {
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.remove('active');
    });
    if(setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn)?.focus();
    }
}

function miesSchlechteLoesung(selector) {
    if(selector === '.preview-search') {
        let temp = document.getElementById('expanded-menu').classList;
        if(temp.contains('active')) temp.remove('active');
    } else if (selector === '.expanded-menu') {
        let temp = document.getElementById('preview-search').classList;
        if(temp.contains('active')) {
            temp.remove('active');
        }
    }
    if (selector === '.expanded-hamburger' || selector === '.expanded-menu' || selector === '.preview-search') {
        toggleMenuIcon();
    }
}

function toggleMenuIcon() {
    if(document.querySelector('.expanded-hamburger').classList.contains('active')
        || document.querySelector('.expanded-menu').classList.contains('active')) {
        document.querySelector('#hamburger-menu-icon').classList.remove('active');
        document.querySelector('#hamburger-close-icon').classList.add('active');
    } else {
        document.querySelector('#hamburger-menu-icon').classList.add('active');
        document.querySelector('#hamburger-close-icon').classList.remove('active');
    }
}

function activateHamburgerOnResize(selector, breakpoint, targetBelow = true) {
    if(targetBelow) {
        if(window.innerWidth <= breakpoint
            && document.getElementById('preview-search').classList.contains('active')
            || document.getElementById('expanded-menu').classList.contains('active')) addActiveState(selector);
    } else {
        if(window.innerWidth >= breakpoint
            && document.getElementById('preview-search').classList.contains('active')
            || document.getElementById('expanded-menu').classList.contains('active')) addActiveState(selector);
    }
}
