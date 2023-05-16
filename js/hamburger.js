const hamburger = document.querySelector(".hamburger");
const navcenter = document.querySelector(".navcenter");
const navbrand = document.querySelector(".navbrand");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navcenter.classList.toggle("active");
    navbrand.classList.toggle("active");
    navbar.classList.toggle("active");
})

function Unclick(){
    hamburger.classList.remove("active");
    navcenter.classList.remove("active");
    navbrand.classList.remove("active");
    navbar.classList.remove("active");
}