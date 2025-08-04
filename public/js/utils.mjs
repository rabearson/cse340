let DESKTOP_BREAKPOINT = 600

export function toggleMobileMenu(header, nav, body, hamburger) {
    function toggleMenu() {
        header.classList.toggle("menu-open")
        body.classList.toggle("no-scroll", header.classList.contains("menu-open"))
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
            if (header.classList.contains("menu-open")) {
                nav.classList.add("menu-transition")
            }
            else {
                nav.classList.remove("menu-transition")
            }
        }
    }
    hamburger.addEventListener('click', toggleMenu)
}

export function handleResizeEffect(header, nav, body) {
    let resizeTimeout;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        body.classList.add("no-transition");
        if (window.innerWidth < DESKTOP_BREAKPOINT && header.classList.contains("menu-open")) {
            nav.classList.remove("menu-transition")
            header.classList.remove("menu-open")
        }

        resizeTimeout = setTimeout(() => {
            body.classList.remove("no-transition")
            if (window.innerWidth < DESKTOP_BREAKPOINT && header.classList.contains("menu-open")) {
                nav.classList.add("menu-transition")
            }
        }, 250);
    })
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        if (header.classList.contains("menu-open")) {
            header.classList.remove("menu-open")
            body.classList.remove("no-transition")
        }
        nav.classList.remove("menu-transition")
    }
}