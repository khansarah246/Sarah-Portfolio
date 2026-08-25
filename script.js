/* =========================================================
   SARAH KHAN PORTFOLIO
   FINAL INTERACTIVE JAVASCRIPT
   Compatible with final index.html + style.css
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");

    const cursorCanvas =
        document.getElementById("cursor-trail");

    const mouseLight =
        document.querySelector(".mouse-light");

    const backgroundGlow =
        document.querySelector(".background-glow");

    const header =
        document.querySelector(".header");

    const themeToggle =
        document.getElementById("theme-toggle");

    const menuBtn =
        document.querySelector(".menu-btn");

    const mobileNav =
        document.querySelector(".mobile-nav");

    const hero =
        document.querySelector(".hero");

    const heroContent =
        document.querySelector(".hero-content");

    const heroVisual =
        document.querySelector(".hero-visual");

    const heroImageWrap =
        document.querySelector(".hero-image-wrap");

    const particleContainer =
        document.querySelector(".floating-particles");

    const contactForm =
        document.getElementById("contact-form");

    const backToTop =
        document.querySelector(".back-to-top");


    /* =====================================================
       DEVICE CHECK
    ===================================================== */

    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window;


    /* =====================================================
       CUSTOM CURSOR + DRAWING TRAIL
    ===================================================== */

    if (
        !isTouchDevice &&
        cursorDot &&
        cursorRing &&
        cursorCanvas
    ) {

        const ctx =
            cursorCanvas.getContext("2d");

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let ringX =
            mouseX;

        let ringY =
            mouseY;

        let lastMouseX =
            mouseX;

        let lastMouseY =
            mouseY;

        let mouseMoving =
            false;

        let mouseTimeout;


        /* -------------------------------------------------
           Canvas sizing
        ------------------------------------------------- */

        function resizeCursorCanvas() {

            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

            cursorCanvas.width =
                Math.round(
                    window.innerWidth * dpr
                );

            cursorCanvas.height =
                Math.round(
                    window.innerHeight * dpr
                );

            cursorCanvas.style.width =
                `${window.innerWidth}px`;

            cursorCanvas.style.height =
                `${window.innerHeight}px`;

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );
        }


        resizeCursorCanvas();


        window.addEventListener(
            "resize",
            resizeCursorCanvas
        );


        /* -------------------------------------------------
           Trail points
        ------------------------------------------------- */

        const trail = [];

        const TRAIL_LENGTH = 34;


        /* -------------------------------------------------
           Mouse movement
        ------------------------------------------------- */

        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;


                trail.push({
                    x: mouseX,
                    y: mouseY,
                    time: performance.now()
                });


                if (
                    trail.length >
                    TRAIL_LENGTH
                ) {
                    trail.shift();
                }


                mouseMoving =
                    true;


                clearTimeout(
                    mouseTimeout
                );


                mouseTimeout =
                    setTimeout(() => {

                        mouseMoving =
                            false;

                    }, 120);

            }
        );


        /* -------------------------------------------------
           Draw smooth fading trail
        ------------------------------------------------- */

        function drawTrail() {

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );


            if (
                trail.length < 2
            ) {
                return;
            }


            const now =
                performance.now();


            /*
             * Remove old trail points.
             * This gives the trail a short-lived
             * drawing/pen effect.
             */

            while (
                trail.length > 0 &&
                now - trail[0].time > 1100
            ) {

                trail.shift();

            }


            if (
                trail.length < 2
            ) {
                return;
            }


            for (
                let i = 1;
                i < trail.length;
                i++
            ) {

                const previous =
                    trail[i - 1];

                const current =
                    trail[i];


                const age =
                    now - current.time;


                const life =
                    Math.max(
                        0,
                        1 - age / 1100
                    );


                const progress =
                    i / trail.length;


                ctx.beginPath();


                ctx.moveTo(
                    previous.x,
                    previous.y
                );


                ctx.lineTo(
                    current.x,
                    current.y
                );


                const gradient =
                    ctx.createLinearGradient(
                        previous.x,
                        previous.y,
                        current.x,
                        current.y
                    );


                gradient.addColorStop(
                    0,
                    "rgba(200,255,0,0)"
                );


                gradient.addColorStop(
                    1,
                    `rgba(200,255,0,${
                        0.55 *
                        life *
                        progress
                    })`
                );


                ctx.strokeStyle =
                    gradient;


                ctx.lineWidth =
                    1.3 *
                    life;


                ctx.lineCap =
                    "round";


                ctx.stroke();

            }

        }


        /* -------------------------------------------------
           Smooth ring + trail animation
        ------------------------------------------------- */

        function animateCursor() {

            ringX +=
                (mouseX - ringX) *
                0.13;

            ringY +=
                (mouseY - ringY) *
                0.13;


            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;


            /*
             * Ring subtly grows while moving.
             */

            if (mouseMoving) {

                cursorRing.style.opacity =
                    "1";

            } else {

                cursorRing.style.opacity =
                    ".78";

            }


            drawTrail();


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        /* -------------------------------------------------
           Cursor hover
        ------------------------------------------------- */

        const hoverElements =
            document.querySelectorAll(
                "a, button, input, textarea, " +
                ".project-card, .skill-row, " +
                ".stat-card, .contact-item"
            );


        hoverElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursorDot.classList.add(
                            "active"
                        );

                        cursorRing.classList.add(
                            "hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        cursorDot.classList.remove(
                            "active"
                        );

                        cursorRing.classList.remove(
                            "hover"
                        );

                    }
                );

            }
        );


        /* -------------------------------------------------
           Cursor click animation
        ------------------------------------------------- */

        document.addEventListener(
            "mousedown",
            () => {

                cursorRing.style.transform =
                    "translate3d(-50%,-50%,0) scale(.72)";

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                cursorRing.style.transform =
                    "translate3d(-50%,-50%,0) scale(1)";

            }
        );


        /* -------------------------------------------------
           Cursor leave page
        ------------------------------------------------- */

        document.addEventListener(
            "mouseleave",
            () => {

                cursorDot.style.opacity =
                    "0";

                cursorRing.style.opacity =
                    "0";

            }
        );


        document.addEventListener(
            "mouseenter",
            () => {

                cursorDot.style.opacity =
                    "1";

                cursorRing.style.opacity =
                    "1";

            }
        );

    }


    /* =====================================================
       MOUSE FOLLOWING LIGHT / SPOTLIGHT
    ===================================================== */

    if (
        !isTouchDevice &&
        mouseLight
    ) {

        let lightX =
            window.innerWidth / 2;

        let lightY =
            window.innerHeight / 2;


        let targetX =
            lightX;

        let targetY =
            lightY;


        document.addEventListener(
            "mousemove",
            (event) => {

                targetX =
                    event.clientX;

                targetY =
                    event.clientY;

            }
        );


        function animateLight() {

            lightX +=
                (targetX - lightX) *
                0.08;

            lightY +=
                (targetY - lightY) *
                0.08;


            mouseLight.style.left =
                `${lightX}px`;

            mouseLight.style.top =
                `${lightY}px`;


            requestAnimationFrame(
                animateLight
            );

        }


        animateLight();

    }


    /* =====================================================
       BACKGROUND GLOW FOLLOWS CURSOR
    ===================================================== */

    if (
        !isTouchDevice &&
        backgroundGlow
    ) {

        let glowTargetX =
            window.innerWidth * .72;

        let glowTargetY =
            window.innerHeight * .25;

        let glowX =
            glowTargetX;

        let glowY =
            glowTargetY;


        document.addEventListener(
            "mousemove",
            (event) => {

                glowTargetX =
                    event.clientX;

                glowTargetY =
                    event.clientY;

            }
        );


        function animateGlow() {

            glowX +=
                (glowTargetX - glowX) *
                0.035;

            glowY +=
                (glowTargetY - glowY) *
                0.035;


            backgroundGlow.style.left =
                `${glowX}px`;

            backgroundGlow.style.top =
                `${glowY}px`;


            requestAnimationFrame(
                animateGlow
            );

        }


        animateGlow();

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (
        menuBtn &&
        mobileNav
    ) {

        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileNav.classList.toggle(
                        "active"
                    );


                menuBtn.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                const icon =
                    menuBtn.querySelector("i");


                if (icon) {

                    if (isOpen) {

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );


        mobileNav
            .querySelectorAll("a")
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        () => {

                            mobileNav.classList.remove(
                                "active"
                            );

                            menuBtn.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            const icon =
                                menuBtn.querySelector(
                                    "i"
                                );


                            if (icon) {

                                icon.classList.remove(
                                    "fa-xmark"
                                );

                                icon.classList.add(
                                    "fa-bars"
                                );

                            }

                        }
                    );

                }
            );

    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    function setTheme(
        theme,
        save = true
    ) {

        const isLight =
            theme === "light";


        body.classList.toggle(
            "light-mode",
            isLight
        );


        if (
            themeToggle
        ) {

            const icon =
                themeToggle.querySelector(
                    "i"
                );


            if (icon) {

                icon.classList.toggle(
                    "fa-moon",
                    !isLight
                );

                icon.classList.toggle(
                    "fa-sun",
                    isLight
                );

            }


            themeToggle.setAttribute(
                "aria-pressed",
                String(isLight)
            );


            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark theme"
                    : "Switch to light theme"
            );

        }


        /*
         * Update browser theme color.
         */

        const themeMeta =
            document.querySelector(
                'meta[name="theme-color"]'
            );


        if (themeMeta) {

            themeMeta.setAttribute(
                "content",
                isLight
                    ? "#f4f3ed"
                    : "#080808"
            );

        }


        if (save) {

            localStorage.setItem(
                "portfolio-theme",
                theme
            );

        }

    }


    if (themeToggle) {

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );


        if (
            savedTheme === "light" ||
            savedTheme === "dark"
        ) {

            setTheme(
                savedTheme,
                false
            );

        } else {

            setTheme(
                "dark",
                false
            );

        }


        themeToggle.addEventListener(
            "click",
            () => {

                const isCurrentlyLight =
                    body.classList.contains(
                        "light-mode"
                    );


                setTheme(
                    isCurrentlyLight
                        ? "dark"
                        : "light"
                );

            }
        );

    }


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       ACTIVE DESKTOP NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const desktopNavLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    function updateActiveNav() {

        let currentSection =
            "home";


        sections.forEach(
            (section) => {

                const top =
                    section.offsetTop - 180;

                const bottom =
                    top +
                    section.offsetHeight;


                if (
                    window.scrollY >= top &&
                    window.scrollY < bottom
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        desktopNavLinks.forEach(
            (link) => {

                const active =
                    link.getAttribute("href") ===
                    `#${currentSection}`;


                link.classList.toggle(
                    "active",
                    active
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element, index) => {

                /*
                 * Small staggered delay.
                 */

                element.style.transitionDelay =
                    `${Math.min(
                        index * 45,
                        250
                    )}ms`;


                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       MAGNETIC ELEMENTS
    ===================================================== */

    if (!isTouchDevice) {

        const magneticElements =
            document.querySelectorAll(
                ".magnetic"
            );


        magneticElements.forEach(
            (element) => {

                element.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        const strength =
                            element.classList.contains(
                                "logo"
                            )
                                ? .06
                                : .12;


                        element.style.transform =
                            `translate3d(
                                ${x * strength}px,
                                ${y * strength}px,
                                0
                            )`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       PROJECT 3D TILT
    ===================================================== */

    if (!isTouchDevice) {

        const tiltElements =
            document.querySelectorAll(
                '[data-tilt="true"]'
            );


        tiltElements.forEach(
            (element) => {

                element.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateX =
                            ((y - centerY) /
                                centerY) *
                            -2.4;


                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            2.4;


                        element.style.transform =
                            `perspective(1200px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-6px)`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    if (
        !isTouchDevice &&
        hero &&
        heroVisual &&
        heroContent
    ) {

        let heroTargetX = 0;
        let heroTargetY = 0;

        let heroX = 0;
        let heroY = 0;


        hero.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        window.innerWidth / 2 -
                        event.clientX
                    ) / 55;


                const y =
                    (
                        window.innerHeight / 2 -
                        event.clientY
                    ) / 55;


                heroTargetX =
                    x;

                heroTargetY =
                    y;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroTargetX = 0;
                heroTargetY = 0;

            }
        );


        function animateHeroParallax() {

            heroX +=
                (heroTargetX - heroX) *
                .07;

            heroY +=
                (heroTargetY - heroY) *
                .07;


            heroVisual.style.transform =
                `translate3d(
                    ${heroX}px,
                    ${heroY}px,
                    0
                )`;


            heroContent.style.transform =
                `translate3d(
                    ${-heroX * .25}px,
                    ${-heroY * .25}px,
                    0
                )`;


            requestAnimationFrame(
                animateHeroParallax
            );

        }


        animateHeroParallax();

    }


    /* =====================================================
       HERO IMAGE TILT
    ===================================================== */

    if (
        !isTouchDevice &&
        heroImageWrap
    ) {

        heroImageWrap.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroImageWrap.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;


                heroImageWrap.style.transform =
                    `perspective(1100px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.015)`;

            }
        );


        heroImageWrap.addEventListener(
            "mouseleave",
            () => {

                heroImageWrap.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       FLOATING PARTICLES
    ===================================================== */

    if (
        particleContainer
    ) {

        /*
         * Clear anything that may already
         * exist before creating particles.
         */

        particleContainer.innerHTML =
            "";


        const particleCount =
            window.innerWidth <= 600
                ? 18
                : 36;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "particle";


            particle.style.left =
                `${Math.random() * 100}%`;


            particle.style.top =
                `${Math.random() * 100}%`;


            particle.style.animationDelay =
                `${Math.random() * 12}s`;


            particle.style.animationDuration =
                `${8 + Math.random() * 14}s`;


            particle.style.opacity =
                `${.12 + Math.random() * .28}`;


            particleContainer.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       PROJECT IMAGE LIGHT TRACKING
    ===================================================== */

    if (!isTouchDevice) {

        document
            .querySelectorAll(
                ".project-image"
            )
            .forEach(
                (image) => {

                    image.addEventListener(
                        "mousemove",
                        (event) => {

                            const rect =
                                image.getBoundingClientRect();


                            const x =
                                (
                                    (
                                        event.clientX -
                                        rect.left
                                    ) /
                                    rect.width
                                ) *
                                100;


                            const y =
                                (
                                    (
                                        event.clientY -
                                        rect.top
                                    ) /
                                    rect.height
                                ) *
                                100;


                            image.style.setProperty(
                                "--mouse-x",
                                `${x}%`
                            );


                            image.style.setProperty(
                                "--mouse-y",
                                `${y}%`
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        function updateBackToTop() {

            backToTop.classList.toggle(
                "show",
                window.scrollY > 600
            );

        }


        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    );

                const email =
                    document.getElementById(
                        "email"
                    );

                const subject =
                    document.getElementById(
                        "subject"
                    );

                const message =
                    document.getElementById(
                        "message"
                    );


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {
                    return;
                }


                const nameValue =
                    name.value.trim();

                const emailValue =
                    email.value.trim();

                const subjectValue =
                    subject.value.trim();

                const messageValue =
                    message.value.trim();


                if (
                    !nameValue ||
                    !emailValue ||
                    !subjectValue ||
                    !messageValue
                ) {

                    alert(
                        "Please fill in all fields."
                    );

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        emailValue
                    )
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                const mailto =
                    "mailto:khansarahhh123@gmail.com" +
                    `?subject=${encodeURIComponent(
                        subjectValue
                    )}` +
                    `&body=${encodeURIComponent(
                        `Name: ${nameValue}\n\n` +
                        `Email: ${emailValue}\n\n` +
                        `Message:\n${messageValue}`
                    )}`;


                window.location.href =
                    mailto;


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       CLOSE MOBILE NAV ON ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mobileNav &&
                menuBtn
            ) {

                mobileNav.classList.remove(
                    "active"
                );


                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE NAV ON RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                mobileNav &&
                menuBtn
            ) {

                mobileNav.classList.remove(
                    "active"
                );


                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* =====================================================
       INITIAL PAGE STATE
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});
