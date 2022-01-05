let menu = document.querySelector('.menu');
let navbar = document.querySelector('.menu_deb');

menu.onclick = () =>{
    navbar.classList.toggle('active');
    menu.classList.toggle('move');
}

