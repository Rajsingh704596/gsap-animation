// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!

  const container = document.querySelector(".container");

  let tween = gsap.to(container, {
    borderRadius: "2%",
    width: "20rem",
    height: "24rem",
    duration: 1,
    paused: true, // so paused at very first time
  });

  let tween2 = gsap.to("p", {
    fontSize: "clamp(2rem, 3vw, 6rem)",
    x: 0,
    duration: 0.8,
    paused: true,
  });

  container.addEventListener("mouseenter", () => {
    tween.play();
    tween2.play();
  });

  container.addEventListener("mouseleave", () => {
    tween.reverse();
    tween2.reverse();
  });
});
