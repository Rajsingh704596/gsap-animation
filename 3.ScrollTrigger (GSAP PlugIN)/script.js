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
    pin: true, // pin obj in screen on that page scrolling time [not when we use pin property must trigger only parent element]
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

//  using pin property create amazing animation in Text so it's fix on screen at scrolling time

gsap.to("#page5 h3", {
  // transform: "translateX(-50%)",
  x: "-50%", // better than using transform string
  ease: "power2.inOut", // for smoother transition

  scrollTrigger: {
    trigger: "#page5", //  Always trigger the parent for pinning
    scroller: "body", //  Default (only change if using Lenis, Locomotive.js etc.)
    markers: true, // remove in production
    start: "top 0%", // means screen k top pr trigger when star- scroll-start touch // Starts pinning when #page5 hits top of viewport
    end: "top -100%", //means screen k top point se bhi upper //Ends after scrolling one full height of #page5
    scrub: 2, //  Smooth scroll-linked animation
    pin: true, // pin property use so must trigger parent tag which is page5 , #page5 ko trigger banake h3 ko transform // Pins #page5, which contains h3
    anticipatePin: 1, //Improves pinning behavior on some browsers with smooth scroll.
  },
});

//^ GSAP Auto-Loop Marquee

// Create infinite marquee animation

const marquee = gsap.to(".marquee-track", {
  xPercent: -50, // Move left by 50% of its width
  ease: "linear",
  duration: 10,
  repeat: -1, // Infinite loop
});

// Optional: Pause on hover for better UX
const marqueeTrack = document.querySelector(".marquee-track");

marqueeTrack.addEventListener("mouseenter", () => {
  marquee.pause();
});
marqueeTrack.addEventListener("mouseleave", () => {
  marquee.play();
});
