window.addEventListener('resize', () => activateHamburgerOnResize('expanded-hamburger', 930));

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        toggleActiveState(button.getAttribute('aria-controls'), button.dataset.focusNext);
    });
});

function toggleActiveState(clazz, setFocusOn = null) {
    document.querySelectorAll(`.${clazz}`).forEach((elem) => {
        elem.classList.toggle('active');
    });
    miesSchlechteLoesung(clazz);
    if(setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn).focus();
    }
}

function addActiveState(clazz, setFocusOn = null) {
    document.querySelectorAll(`.${clazz}`).forEach((elem) => {
        elem.classList.add('active');
    });
    if(setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn).focus();
    }
}

// noinspection JSUnusedGlobalSymbols
function removeActiveState(clazz, setFocusOn = null) {
    document.querySelectorAll(`.${clazz}`).forEach((elem) => {
        elem.classList.remove('active');
    });
    if(setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn).focus();
    }
}

function miesSchlechteLoesung(clazz) {
    if(clazz === 'preview-search') {
        let temp = document.getElementById('expanded-menu').classList;
        if(temp.contains('active')) temp.remove('active');
    } else if (clazz === 'expanded-menu') {
        let temp = document.getElementById('preview-search').classList;
        if(temp.contains('active')) {
            temp.remove('active');
        }
    }
    if (clazz === 'expanded-hamburger' || clazz === 'expanded-menu' || clazz === 'preview-search') {
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

function activateHamburgerOnResize(clazz, breakpoint, targetBelow = true) {
    if(targetBelow) {
        if(window.innerWidth <= breakpoint
            && document.getElementById('preview-search').classList.contains('active')
            || document.getElementById('expanded-menu').classList.contains('active')) addActiveState(clazz);
    } else {
        if(window.innerWidth >= breakpoint
            && document.getElementById('preview-search').classList.contains('active')
            || document.getElementById('expanded-menu').classList.contains('active')) addActiveState(clazz);
    }
}
