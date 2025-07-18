//! scroll trigger - scroll k basis pr animation trigger ho

gsap.from("#page1 #box", {
  scale: 0,
  delay: 1,
  duration: 2,
  rotate: 360,
});

// Page 2 animation with basic ScrollTrigger
gsap.from("#page2 #box", {
  scale: 0,
  duration: 2,
  rotate: 360,

  scrollTrigger: "#page2 #box", //shortcut way scrollTrigger apply
});

// Page 3 animation with detailed ScrollTrigger
gsap.from("#page3 #box", {
  scale: 0,
  duration: 5,
  rotate: 360,

  //   scrollTrigger specific property
  scrollTrigger: {
    trigger: "#page3 #box", // trigger element name
    scroller: "body", //90% case we use only when we work with lenis then change
    //    markers: true, // screen mark point visible
    start: "top 90%", // when top of box hits 80% of viewport
    end: "top 50%", // when top of box hits 20% of viewport
    scrub: true, // completely dependent on scrolling base animation run {start to end point based on given marker}  {here we can pass boolean value / 1 (low smooth) to 5 (high smooth) no for smooth animation}
    pin: true, // pin obj in screen on that page scrolling time
  },
});

// Page 4 - h1 tag animation with detailed ScrollTrigger
gsap.from("#page4 h1", {
  opacity: 0,
  x: -500,
  duration: 2,

  scrollTrigger: {
    trigger: "#page4 h1",
    scroller: "body",
    markers: true, // only use develop time
    start: "top 80%",
  },
});

// Page 4 - h2 tag animation with detailed ScrollTrigger
gsap.from("#page4 h2", {
  opacity: 0,
  x: 500,
  duration: 2,

  scrollTrigger: {
    trigger: "#page4 h2",
    scroller: "body",
    markers: true, // only use develop time
    start: "top 70%",
  },
});
