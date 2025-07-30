// gsap.to("#box1", {
//   x: 1000,
//   duration: 2,
//   delay: 1,
//   rotate: 360,
// });

// gsap.to("#box2", {
//   x: 1000,
//   duration: 2,
//   delay: 2,
//   rotate: 360,
// });

// gsap.to("#box3", {
//   x: 1000,
//   duration: 2,
//   delay: 3,
//   rotate: 360,
// });

// so here one by one animation perform k liye manually type delay kar rhe hai for time adjust, but we can use GSAP timeline , where automatic element perform animation one by one synchronously
//^ use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  //^ gsap code here!

  let t1 = gsap.timeline({ paused: true }); //initially paused timeline

  t1.to("#box1", {
    x: 1000,
    duration: 5,
    rotate: 360,
  });

  t1.to("#box2", {
    x: 1000,
    duration: 5,
    rotate: 180,
    scale: 0.5,
  });

  t1.to("#box3", {
    x: 1000,
    duration: 5,
    rotate: 360,
    borderRadius: "50%",
  });

  // click handlers for controlling the timeline instance all element...
  document.querySelector("#play").onclick = () => t1.play();
  document.querySelector("#pause").onclick = () => t1.pause(); //pause
  document.querySelector("#resume").onclick = () => t1.resume(); //resume (honors direction - reversed or not)
  document.querySelector("#reverse").onclick = () => t1.reverse(); //reverse (always goes back towards the beginning)
  document.querySelector("#restart").onclick = () => t1.restart();
  document.querySelector("#seek").onclick = () => t1.seek(0.5); //jump to exactly 0.5 seconds into the tween
  document.querySelector("#progress").onclick = () => t1.progress(0.25); //jump to exacty 1/4th into the tween 's progress:
  document.querySelector("#timescale").onclick = () => t1.timeScale(0.5); //make the tween go half-speed
  document.querySelector("#timescale2x").onclick = () => t1.timeScale(2); //make the tween go double-speed
  document.querySelector("#kill").onclick = () => t1.kill(); //immediately kill the timeline and make it eligible for garbage collection

  // we can even chain control methods
  // Play the timeline at double speed - in reverse.
  document.querySelector("#chainmethodcontrol").onclick = () =>
    t1.timeScale(2).reverse();

  // Other e.g. timeline without control

  var t2 = gsap.timeline();

  t2.from("h2", {
    y: -30,
    opacity: 0,
    duration: 1,
    delay: 0.5,
  });

  t2.from("li", {
    y: -30,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
  });

  t2.from("h1", {
    y: 20,
    opacity: 0,
    duration: 1,
    scale: 0.2,
  });
});
