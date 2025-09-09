// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  const tl = gsap.timeline({
    defaults: { ease: "power4.inOut", duration: 0.5 },
  });

  tl.to([".fade1", ".fade2", ".fade3"], {
    scaleY: 1,
    stagger: 0.2,
  })
    .to(
      "h1",
      {
        x: 0,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
      },
      "-=.5"
    )
    .to(".fade1", {
      scaleY: 0,
    })
    .to(
      ".fade3",
      {
        scaleY: 0,
        transformOrigin: "bottom",
      },
      "-=.5"
    )
    .to(
      ".fade2",
      {
        height: "100vh",
      },
      "-=.4"
    )
    .to(
      "h1",
      {
        scale: 0.6,
      },
      "-=.5"
    );
});
