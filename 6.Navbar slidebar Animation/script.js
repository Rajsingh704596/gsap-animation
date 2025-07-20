const menu = document.querySelector("#nav i");
const cross = document.querySelector("#slidebar i");

const tl = gsap.timeline();

tl.to("#slidebar", {
  right: 0,
  duration: 0.5,
});

tl.from("#slidebar h4", {
  x: 150,
  duration: 0.5,
  stagger: 0.2,
  opacity: 0,
});

tl.from("#slidebar i", {
  opacity: 0,
});

tl.pause(); //now timeline is pause

//click event listener apply in selector menu and close
menu.addEventListener("click", function () {
  //   console.log("menu click for open");
  tl.play(); // so when click timeline is play
});

cross.addEventListener("click", function () {
  //   console.log("cross click for close");
  tl.reverse(); // so cross click then reverse timeline means reset
});
