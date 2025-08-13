// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  // gsap code here!

  // Initialize ScrollSmoother
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true,
  });

  // timeline first
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".secondpage",
      start: "20% 50%",
      end: "120% 50%",
      scrub: 2,
      markers: true,
    },
  });

  tl.to(".text-area-front", {
    width: "100%",
  });

  //  timeline second  (third page)
  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".thirdpage",
      start: "0% 50%",
      end: "120% 50%",
      scrub: 1.5,
      markers: true,
      pin: true,
    },
  });

  tl2.to(".text-area-2 h1", {
    width: "100%",
  });
  tl2.to(".text-area-2 h2", {
    width: "100%",
    // delay: -0.4,                    //-0.4 s before start
  });
});
