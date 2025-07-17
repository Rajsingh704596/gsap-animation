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

// let t1 = gsap.timeline();

// t1.to("#box1", {
//   x: 1000,
//   duration: 2,
//   rotate: 360,
// });

// t1.to("#box2", {
//   x: 1000,
//   duration: 2,
//   rotate: 180,
//   scale: 0.5,
// });

// t1.to("#box3", {
//   x: 1000,
//   duration: 2,
//   rotate: 360,
//   borderRadius: "50",
// });

// Other e.g.

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
