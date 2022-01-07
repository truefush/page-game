let menu = document.querySelector('.menu');
let navbar = document.querySelector('.menu_deb');

menu.addEventListener("click", () => {
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
});

//notification

let bell = document.querySelector('.notification');

document.querySelector('#bell').addEventListener("click",() => {
    bell.classList.toggle('active');
});
