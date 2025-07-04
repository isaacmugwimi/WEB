const bar=document.getElementById('bar'); 
const navbar=document.getElementById('navbar');
const close = document.getElementById('close')

var main_image = document.getElementById("main-image")
var small_image = document.getElementsByClassName("small-img")


if ( bar){
    // click is the event listener name
    bar.addEventListener('click', ()=>{
        navbar.classList.add('active')

    })
}

if (close){
    close.addEventListener('click', ()=>{
        navbar.classList.remove('active')
    })
}

small_image[0].onclick=function () {
    main_image.src = small_image[0].src
}
small_image[1].onclick=function () {
    main_image.src = small_image[1].src
}

small_image[2].onclick=function () {
    main_image.src = small_image[2].src
}
small_image[3].onclick=function () {
    main_image.src = small_image[3].src
}