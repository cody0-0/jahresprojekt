window.addEventListener('resize', () => activateHamburgerOnResize('.expanded-hamburger', 945));

// open/close targets of clicked '.toggle-button' + constraints for specific toggles
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        if (button.classList.contains('filter')) {
            removeActiveState(`.filter-expansion:not(${button.getAttribute('aria-controls')})`)
        }
        if (button.classList.contains('menu-item') || button.getAttribute('aria-controls').includes('preview-search')) {
            removeActiveState(`.expanded-hamburger:not(${button.getAttribute('aria-controls')})`);
        }

        if(button.id.includes('hamburger-toggle') && document.getElementById('hamburger-close-icon').classList.contains('active') && window.innerWidth < 945) { // close hamburger menu always when any hamburger element is active TODO: find a better solution
            removeActiveState('.expanded-hamburger');
        } else {
            toggleActiveState(button.getAttribute('aria-controls'), button.dataset.focusNext);
        }
        syncExpandedState('.toggle-button');
        toggleMenuIcon();

        if (button.getAttribute('aria-controls') === '.date-filter') {
            scrollToSelected('.wheel-select.date-filter-select');
        }
    });
});

// Close expanded menu when selecting a menu point
document.querySelectorAll('.expanded-header a').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        removeActiveState('.expanded-hamburger');
        syncExpandedState('.toggle-button');
        toggleMenuIcon();
    });
});

function toggleActiveState(selector, setFocusOn = null) {
    document.querySelectorAll(selector).forEach((elem) => {
        window.addEventListener('click', (e) => {
            if (!elem.contains(e.target)) {
                elem.classList.remove('active');
                syncExpandedState('.toggle-button');
            }
        });
        elem.classList.toggle('active');
    });
    if (setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn)?.focus();
    }
}

function addActiveState(selector, setFocusOn = null) {
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.add('active');
    });
    if (setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn)?.focus();
    }
}

// noinspection JSUnusedGlobalSymbols
function removeActiveState(selector, setFocusOn = null) {
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.remove('active');
    });
    if (setFocusOn != null || setFocusOn !== undefined) {
        document.querySelector(setFocusOn)?.focus();
    }
}

function toggleMenuIcon() {
    if (document.querySelector('.expanded-hamburger').classList.contains('active')
        || document.querySelector('.expanded-menu').classList.contains('active')) {
        document.querySelector('#hamburger-menu-icon').classList.remove('active');
        document.querySelector('#hamburger-close-icon').classList.add('active');
    } else {
        document.querySelector('#hamburger-menu-icon').classList.add('active');
        document.querySelector('#hamburger-close-icon').classList.remove('active');
    }
}

function activateHamburgerOnResize(selector, breakpoint, targetBelow = true) {
    if (targetBelow) {
        if (window.innerWidth <= breakpoint
            && document.querySelector('#preview-search-form').classList.contains('active')
            || document.querySelector('#expanded-menu').classList.contains('active')) addActiveState(selector);
    } else {
        if (window.innerWidth >= breakpoint
            && document.querySelector('#preview-search-form').classList.contains('active')
            || document.querySelector('#expanded-menu').classList.contains('active')) addActiveState(selector);
    }
}

function syncExpandedState(buttonSelector) {
    buttons = document.querySelectorAll(buttonSelector);
    buttons.forEach(button => {
        if (document.querySelector(button.getAttribute('aria-controls')).classList.contains('active')) {
            button.classList.add('expanded');
        } else {
            button.classList.remove('expanded');
        }
    });
}
