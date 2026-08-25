// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileClose = document.querySelector(".mobile-close");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");

    });

}


if (mobileClose) {

    mobileClose.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

    });

}


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

    });

});


// =========================================================
// THEME TOGGLE
// =========================================================

const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("light-mode")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    });

}


// =========================================================
// SCROLL PROGRESS
// =========================================================

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width = `${progress}%`;

});


// =========================================================
// HEADER SHADOW
// =========================================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 15px 40px rgba(0,0,0,.35)";

    } else {

        header.style.boxShadow = "none";

    }

});


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


// =========================================================
// CUSTOM CURSOR
// =========================================================

const cursor =
    document.querySelector(".cursor");

const cursorFollower =
    document.querySelector(".cursor-follower");

const cursorLabel =
    document.querySelector(".cursor-label");


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let followerX = mouseX;
let followerY = mouseY;


document.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    }

});


function animateCursor() {

    followerX += (mouseX - followerX) * 0.14;
    followerY += (mouseY - followerY) * 0.14;

    if (cursorFollower) {

        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;

    }

    if (cursorLabel) {

        cursorLabel.style.left = `${mouseX}px`;
        cursorLabel.style.top = `${mouseY}px`;

    }

    requestAnimationFrame(animateCursor);

}

animateCursor();


// =========================================================
// CURSOR HOVER EFFECT
// =========================================================

const interactiveElements =
    document.querySelectorAll(
        "a, button, .project-card, .skill-item"
    );


interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        document.body.classList.add("cursor-active");

    });


    element.addEventListener("mouseleave", () => {

        document.body.classList.remove("cursor-active");

    });

});


// =========================================================
// PROJECT CURSOR LABEL
// =========================================================

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        if (cursorLabel) {

            cursorLabel.textContent = "VIEW";

        }

    });

});


// =========================================================
// MAGNETIC BUTTON EFFECT
// =========================================================

const magneticElements =
    document.querySelectorAll(".magnetic");


magneticElements.forEach(element => {

    element.addEventListener("mousemove", event => {

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

        element.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform = "";

    });

});


// =========================================================
// PROJECT IMAGE TILT
// =========================================================

projectCards.forEach(card => {

    const image =
        card.querySelector(".project-image");

    if (!image) return;


    card.addEventListener("mousemove", event => {

        if (window.innerWidth <= 768) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateX =
            (0.5 - y) * 4;

        const rotateY =
            (x - 0.5) * 4;

        image.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        image.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


// =========================================================
// CONTACT FORM
// =========================================================

const form =
    document.getElementById("contact-form");


if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name")
                .value
                .trim();


        const email =
            document.getElementById("email")
                .value
                .trim();


        const subject =
            document.getElementById("subject")
                .value
                .trim();


        const message =
            document.getElementById("message")
                .value
                .trim();


        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill in all fields.");

            return;

        }


        alert(
            "Thank you, " +
            name +
            "! Your message has been submitted."
        );


        form.reset();

    });

}


// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const sections =
    document.querySelectorAll("section[id]");

const navAnchors =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navAnchors.forEach(anchor => {

        anchor.style.color = "";

        if (
            anchor.getAttribute("href") ===
            `#${currentSection}`
        ) {

            anchor.style.color = "#ffffff";

        }

    });

});


// =========================================================
// SMOOTH PROJECT IMAGE LOADING
// =========================================================

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("loaded");

    });

});


// =========================================================
// ESCAPE MOBILE MENU
// =========================================================

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        mobileMenu.classList.contains("active")
    ) {

        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

    }

});
