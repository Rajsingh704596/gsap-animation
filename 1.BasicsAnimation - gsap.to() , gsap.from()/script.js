//! gsap.to() - initial to final position animation move
//! gsap.from() - final to initial position animation move
//! gsap.fromTo() - both state define initial and final

//^ use a script tag or an external JS file    {Recommended: this line must be pass so when whole DOM Content Loaded then animation run}
document.addEventListener("DOMContentLoaded", (event) => {
  //^ gsap code here!

  gsap.to("#box", {
    x: 1000,
    duration: 2, // take 2 sec. time for animation
    delay: 1, // after delay 1 sec. animation start
  });

  gsap.from("#box2", {
    x: 1000,
    duration: 2,
    delay: 1,
  });

  gsap.to("#box3", {
    x: 500,
    y: 500,
    duration: 3,
    delay: 3,
    rotate: 360,
    //   normal css pass in camelCase and string and special character(%) used inside double cot ""
    backgroundColor: "blue",
    borderRadius: "50%",

    scale: 0.5,
  });

  gsap.from("h2", {
    opacity: 0, // means final position opacity 0 to move initial position opacity (which is default) 1
    y: 30,
    duration: 2,
    delay: 1,

    stagger: 1, // means every element run one by one on every 1 sec.      // if we not use all element run together(means all h2)
    // stagger:-1  // vice versa work last element show first

    // stagger:0.3    // best
  });

  gsap.to("#box4", {
    x: 1200,
    duration: 2,
    delay: 2,
    rotate: 360,
    repeat: 1, // means one time or repeat
    // repeat: -1,        // infinite time repeat
    yoyo: true, //animate and vice-versa animate together
  });

  //$ click handlers for controlling the tween instance (gsap.to(),gsap.from(),gsap.fromTo())...
  let tween = gsap.fromTo(
    "#box5",
    {
      //initial state
      x: 300,
    },
    {
      // final state
      x: 800,
      y: -500,
      duration: 4,
      autoAlpha: 0,
      repeat: Infinity,
      paused: true,
    }
  );

  document.querySelector("#play").onclick = () => tween.play();
  document.querySelector("#pause").onclick = () => tween.pause();
  document.querySelector("#resume").onclick = () => tween.resume();
  document.querySelector("#reverse").onclick = () => tween.reverse();
  document.querySelector("#restart").onclick = () => tween.restart();
});
