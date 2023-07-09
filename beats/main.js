const sections = $("section");
const display = $(".maincontent");

let inScroll = false;

sections.first().addClass("active");

const performTransition = sectionEq => {
  if(inScroll === false) {
    inScroll = true;
     const position = sectionEq * -100;
     
     
const currentSection = sections.eq(sectionEq);
const menuTheme = currentSection.attr("data-sidemenu-theme");
const sideMenu = $(".fixed-menu");

/*if (menutheme ==="black") {
  sideMenu.addClass("здесь должен быть псевдоэлемент");
} else {
  sideMenu.removeClass("здесь должен быть псевдоэлемент");
}*/

  display.css ( {
    transform: `translateY(${position}%)`
  });

  sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

  setTimeout (() => {
inScroll = false;
sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active")


  }, 1300);
 }
};


const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index())

  }
  if (direction ==="prev" && prevSection.length) {
    performTransition(prevSection.index())
  }
};
$(window).on("wheel", e => {
const deltaY = e.originalEvent.deltaY;

if (deltaY > 0) {
  scrollViewport("next");

}
if (deltaY<0) {
  scrollViewport("prev");

}
});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea") {

  switch (e.keyCode) {
    case 38: 
    scrollViewport("prev")

    break;

    case 40:
    scrollViewport("next")
    break;
  }
}
});

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const targ = $this.attr("data-scroll-to"); //д.б.таргет
  const reqSection = $(`[data-section-id=${targ}]`);
performTransition(reqSection.index());
})





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
        content.text("Ошибка сервера");
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



let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.749486, 37.591485],
   zoom: 14,
   controls: [],
 });
 
 let coords = [
     [55.752004, 37.576133],
     [55.761720, 37.604592],
     [55.756351, 37.622836],
     [55.742580, 37.582269],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './images/marker.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);




const mesureWidth =item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".products-menu__list");
 const titlesBlocks = container.find(".products-menu__title");
const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

const textContainer = item.find(".products-menu__container");
const paddingLeft = parseInt(textContainer.css("padding-left"));
const paddingRight = parseInt(textContainer.css("padding-right"));

const isMobile = window.matchMedia("(max-width: 768px").matches;
if(isMobile) {
 reqItemWidth = screenWidth - titlesWidth;
}
else {
  reqItemWidth = 400;
}

return {
  container: reqItemWidth,
  textContainer: reqItemWidth - paddingLeft - paddingRight
}
};

const closeEveryItemInContainer = (container) => {
  const items = container.find(".products-menu__item");
  const part = container.find(".products-menu__content"); //была переменная content
  
  items.removeClass("active");
 part.width(0);
};

const openItem = (item) => {
  const hiddenContent = item.find(".products-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".products-menu__container");
  textBlock.width(reqWidth.textContainer);
  item.addClass ("active");

  hiddenContent.width(reqWidth.container);
};



$(".products-menu__title").on("click", (e) => {
e.preventDefault();

const $this = $(e.currentTarget);
const item = $this.closest(".products-menu__item");
const itemOpened = item.hasClass("active");
const container = $this.closest(".products-menu__list");

if(itemOpened) {
closeEveryItemInContainer(container)
} else {
  closeEveryItemInContainer(container)
  openItem(item);
}
});


let player;
const playerContainer = $(".player");
 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
   } else {
     player.playVideo();
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     left: `${newButtonPositionPercent}%`
   });
 
   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
     left: `${completedPercent}%`
   });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}
 
eventsInit();
 