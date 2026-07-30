// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// ==========================
// CLOSE MENU AFTER CLICK
// ==========================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

// ==========================
// DARK MODE
// ==========================

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("light-mode")){

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    }

    else{

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

});

// ==========================
// CONTACT FORM
// ==========================

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    if(name==="" || email==="" || subject==="" || message===""){

        alert("Please fill in all fields.");

        return;

    }

    alert("Message sent successfully!");

    form.reset();

});

// ==========================
// HEADER SHADOW
// ==========================

window.addEventListener("scroll",()=>{

const header=document.querySelector(".header");

header.style.boxShadow=window.scrollY>50

?"0 10px 30px rgba(0,0,0,.25)"

:"none";

});