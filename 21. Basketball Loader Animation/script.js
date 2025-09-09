// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  const ball = document.querySelector("img");
  const h1 = document.querySelector("h1");
  const loader = document.querySelector(".loader");

  gsap.set(ball, { yPercent: -600, rotationZ: -295 });
  gsap.set(h1, { yPercent: -100 });
  gsap.set(loader, { scaleX: 0 });

  gsap.to(ball, {
    yPercent: -50,
    rotationZ: 0,
    duration: 2,
    ease: "bounce.out",
  });

  gsap.to(h1, {
    yPercent: 0,
    delay: 1.7,
  });

  gsap.to(loader, {
    scaleX: 1,
    delay: 2,
    duration: 2,
  });
});
