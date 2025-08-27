// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  gsap.set("img", {
    yPercent: -110,
  });
  gsap.set("p", {
    opacity: 0,
  });

  gsap.to("img", {
    yPercent: 0,
    scale: 1.3,
    duration: 1,
    delay: 0.5,
    stagger: 0.2,
    ease: "power3.out",

    onComplete: scaleDownAndFadeIn, // after complete fun call
  });

  function scaleDownAndFadeIn() {
    gsap.to("img", {
      scale: 1,
      duration: 1,
    });
    gsap.to("p", {
      opacity: 1,
      y: 50,
      stagger: 0.3,
      duration: 2,
    });
  }
});
