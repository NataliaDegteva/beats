


function accordionTeam() {
  const workers = document.querySelectorAll(".accordeon__item");
  const teamAccord = document.querySelector(".accordeon");

  teamAccord.addEventListener("click", function (event) {
    event.preventDefault(); 
    const target = event.target;
   
    if (target.classList.contains("accordeon__link")) {
      const worker = target.parentNode; 
      const content = target.nextElementSibling; 
      const contentHeight = content.firstElementChild.clientHeight;

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

let links = document.querySelectorAll('.menu__link'); [1,2,3,4,5,6,7]

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

function toggleMenu(){
  burger.classList.toggle('burger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-menu');
}

burger.addEventListener('click' , toggleMenu);



const findBlockByAlias = alias => {
  return $(".feedback__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") ===alias
  });
};
$(".interactive-avatar__link"). click(e=> {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".feedback__switcher-item");

  itemToShow.addClass("active").siblings().removeClass("active");

  curItem.addClass("interactive-avatar--active").siblings(). removeClass("interactive-avatar--active");
});


const slider = $(".product__list").bxSlider({
  pager:false,
  controls: false,
  
});

$(".product__slider-arrow--left").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".product__slider-arrow").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});

const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach(field => {
    field.removeClass("input-error");
    if(field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$(".form").submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name= 'name']");
  const phone = form.find("[name= 'phone']");
  const comment = form.find("[name= 'comment']");
  const to = form.find("[name= 'to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name,phone,comment,to]);


  if (isValid) { 
    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },

      success: data => {
        content.text(data.message);
       
        $.fancybox.open( {
          src: "#modal",
          type: "inline"
        });
      },
      error: data => {
        const message= data.responseJSON.message;
        content.text(message);
        modal.addClass("error-modal");
        $.fancybox.open( {
          src: "#modal",
          type: "inline"
        });
      }
    });
  };



 /* $.fancybox.open( {
    src: "#modal",
    type: "inline"
  });*/
});

$(".app-submit-button").click(e=> {
  e.preventDefault();

  $.fancybox.close();
});