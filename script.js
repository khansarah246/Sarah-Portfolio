/* =========================================================
   SARAH KHAN PORTFOLIO
   INTERACTIVE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");

    if (cursor && cursorFollower) {

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });

        function animateCursor() {

            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        /* Cursor interaction */

        const hoverElements = document.querySelectorAll(
            "a, button, .project-card, .skill-card, .about-card"
        );

        hoverElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {

                cursor.classList.add("cursor-hover");
                cursorFollower.classList.add("cursor-hover");

            });

            element.addEventListener("mouseleave", () => {

                cursor.classList.remove("cursor-hover");
                cursorFollower.classList.remove("cursor-hover");

            });

        });

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");

        });


        document.querySelectorAll(".nav-links a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");

            });

        });

    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const themeBtn = document.getElementById("theme-toggle");

    if (themeBtn) {

        const themeIcon = themeBtn.querySelector("i");

        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {

            document.body.classList.add("light-mode");

            if (themeIcon) {

                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");

            }

        }


        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");


            if (isLight) {

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

                if (themeIcon) {

                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");

                }

            } else {

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

                if (themeIcon) {

                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");

                }

            }

        });

    }


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    const header = document.querySelector(".header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".about-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".contact-box, " +
        ".contact-form"
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       PROJECT CARD 3D TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn, .social-icons a, .footer-social a"
        );


    magneticButtons.forEach((button) => {

        button.addEventListener("mousemove", (e) => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;


            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";

        });

    });


    /* =====================================================
       FLOATING PARTICLES
    ===================================================== */

    const particlesContainer =
        document.querySelector(".floating-particles");


    if (particlesContainer) {

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.classList.add("particle");

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.animationDelay =
                `${Math.random() * 8}s`;

            particle.style.animationDuration =
                `${5 + Math.random() * 8}s`;

            particle.style.opacity =
                `${0.2 + Math.random() * 0.5}`;

            particlesContainer.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(".hero-image");

    const heroContent =
        document.querySelector(".hero-content");


    if (hero && heroImage && heroContent) {

        hero.addEventListener(
            "mousemove",
            (e) => {

                const x =
                    (window.innerWidth / 2 - e.clientX) /
                    35;

                const y =
                    (window.innerHeight / 2 - e.clientY) /
                    35;


                heroImage.style.transform =
                    `translate(${x}px, ${y}px)`;


                heroContent.style.transform =
                    `translate(${-x * 0.3}px, ${-y * 0.3}px)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "translate(0, 0)";

                heroContent.style.transform =
                    "translate(0, 0)";

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const form =
        document.getElementById("contact-form");


    if (form) {

        form.addEventListener(
            "submit",
            (e) => {

                e.preventDefault();

                const name =
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const subject =
                    document.getElementById("subject");

                const message =
                    document.getElementById("message");


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    return;

                }


                if (
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    subject.value.trim() === "" ||
                    message.value.trim() === ""
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
                        email.value.trim()
                    )
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                /*
                 * Opens the user's email client.
                 * Replace the email address if required.
                 */

                const mailto =
                    `mailto:khansarahhh123@gmail.com` +
                    `?subject=${encodeURIComponent(
                        subject.value.trim()
                    )}` +
                    `&body=${encodeURIComponent(
                        `Name: ${name.value.trim()}\n\n` +
                        `Email: ${email.value.trim()}\n\n` +
                        `Message:\n${message.value.trim()}`
                    )}`;


                window.location.href = mailto;

                form.reset();

            }
        );

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.querySelector(".typing-text");


    if (typingElement) {

        const words = [
            "Front-End Developer",
            "Software Engineering Student",
            "Web Developer",
            "Creative Problem Solver"
        ];


        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;


                if (
                    charIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1800
                    );

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;


                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 50 : 90
            );

        }


        typeEffect();

    }


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    const scrollTop =
        document.querySelector(".scroll-top");


    if (scrollTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    scrollTop.classList.add(
                        "show"
                    );

                } else {

                    scrollTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        scrollTop.addEventListener(
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
       PROJECT IMAGE LIGHT EFFECT
    ===================================================== */

    document
        .querySelectorAll(".project-image")
        .forEach((image) => {

            image.addEventListener(
                "mousemove",
                (e) => {

                    const rect =
                        image.getBoundingClientRect();

                    const x =
                        ((e.clientX - rect.left) /
                            rect.width) *
                        100;

                    const y =
                        ((e.clientY - rect.top) /
                            rect.height) *
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

        });


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            const loader =
                document.querySelector(
                    ".preloader"
                );


            if (loader) {

                loader.classList.add(
                    "preloader-hidden"
                );


                setTimeout(() => {

                    loader.remove();

                }, 800);

            }

        }
    );

});
// ==================================================
// CUSTOM CURSOR
// ==================================================

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const cursorCanvas = document.getElementById("cursor-trail");

const cursorCtx = cursorCanvas.getContext("2d");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

const trail = [];

const TRAIL_LENGTH = 35;


// ==================================================
// CANVAS SIZE
// ==================================================

function resizeCursorCanvas() {

    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;

}

resizeCursorCanvas();

window.addEventListener("resize", resizeCursorCanvas);


// ==================================================
// MOUSE MOVEMENT
// ==================================================

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    // Small cursor
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    // Save mouse position for trail
    trail.push({
        x: mouseX,
        y: mouseY
    });

    if (trail.length > TRAIL_LENGTH) {
        trail.shift();
    }

});


// ==================================================
// SMOOTH RING
// ==================================================

function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    drawTrail();

    requestAnimationFrame(animateCursor);

}

animateCursor();


// ==================================================
// DRAW CURSOR TRAIL
// ==================================================

function drawTrail() {

    cursorCtx.clearRect(
        0,
        0,
        cursorCanvas.width,
        cursorCanvas.height
    );

    if (trail.length < 2) return;

    cursorCtx.beginPath();

    cursorCtx.moveTo(
        trail[0].x,
        trail[0].y
    );

    for (let i = 1; i < trail.length; i++) {

        const current = trail[i];

        cursorCtx.lineTo(
            current.x,
            current.y
        );

    }

    const gradient = cursorCtx.createLinearGradient(
        trail[0].x,
        trail[0].y,
        trail[trail.length - 1].x,
        trail[trail.length - 1].y
    );

    gradient.addColorStop(
        0,
        "rgba(56,189,248,0)"
    );

    gradient.addColorStop(
        0.5,
        "rgba(56,189,248,.25)"
    );

    gradient.addColorStop(
        1,
        "rgba(139,92,246,.8)"
    );

    cursorCtx.strokeStyle = gradient;

    cursorCtx.lineWidth = 2;

    cursorCtx.lineCap = "round";

    cursorCtx.lineJoin = "round";

    cursorCtx.stroke();

}


// ==================================================
// CURSOR HOVER EFFECT
// ==================================================

const hoverElements = document.querySelectorAll(
    "a, button, input, textarea, .skill-card, .project-card, .about-card"
);

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursorRing.classList.add("hover");

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.classList.remove("hover");

    });

});


// ==================================================
// CLICK EFFECT
// ==================================================

document.addEventListener("mousedown", () => {

    cursorRing.style.transform =
        "translate(-50%, -50%) scale(.7)";

});

document.addEventListener("mouseup", () => {

    cursorRing.style.transform =
        "translate(-50%, -50%) scale(1)";

});


// ==================================================
// FLOATING PARTICLES
// ==================================================

const particleContainer =
    document.querySelector(".floating-particles");

for (let i = 0; i < 35; i++) {

    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.animationDuration =
        `${8 + Math.random() * 15}s`;

    particle.style.animationDelay =
        `${Math.random() * 10}s`;

    particle.style.opacity =
        `${0.15 + Math.random() * 0.3}`;

    particleContainer.appendChild(particle);

}
