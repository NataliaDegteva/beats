let burger  = document.querySelector('#burger');
let overlay = document.querySelector('.overlay');
let body = document.querySelector('body');

let links = document.querySelectorAll('.point__link'); [1,2,3,4,5,6,7]

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

function toggleMenu(){
  burger.classList.toggle('burger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-overlay-point');
}

burger.addEventListener('click' , toggleMenu);




function accordionTeam() {
  const workers = document.querySelectorAll(".accordeon__item");
  const teamAccord = document.querySelector(".accordeon");

  teamAccord.addEventListener("click", function (event) {
    event.preventDefault(); // скидываем стандартное состояние (что бы не кидало страницу вверх / или не перенаправляло на другую)
    const target = event.target; // то на что мы клацнули
   
    if (target.classList.contains("accordeon__link")) {
      const worker = target.parentNode; // родитель нашей ссылки (li.accordeon__item)
      const content = target.nextElementSibling; //  элемент который находится рядом с рашей ссылкой на уровне (accordeon__content)
      const contentHeight = content.firstElementChild.clientHeight; // высота wrapper который лежит в accordeon__content

      for (const iterator of workers) {
        if (iterator !== worker) {
          iterator.classList.remove("accordeon__item-active");
          iterator.lastElementChild.style.height = 0;
        }
      }

      if (worker.classList.contains("accordeon__item-active")) {
        worker.classList.remove("accordeon__item-active");
        content.style.height = 0;
      } else {
        worker.classList.add("accordeon__item-active");
        content.style.height = contentHeight + "px";
      }
    }
  });
}

accordionTeam();


let burger  = document.querySelector('.burger');
let overlay = document.querySelector('.overlay');
let body = document.querySelector('body');

let links = document.querySelectorAll('.menu__link'); [1,2,3,4]

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

function toggleMenu(){
  burger.classList.toggle('burger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-menu');
}

burger.addEventListener('click' , toggleMenu);


