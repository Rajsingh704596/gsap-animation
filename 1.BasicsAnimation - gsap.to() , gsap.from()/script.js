//! gsap.to() - initial to final position animation move
//! gsap.from() - final to initial position animation move

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
