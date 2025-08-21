document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#main-container",
      start: "38% 50%",
      end: "100% 50%",
      scrub: 2,
      pin: true,
    },
  });

  tl.to(".text", { top: "-7%" }, "tog-a")
    .to("#card-one", { top: "35%" }, "tog-a")
    .to("#card-two", { top: "130%" }, "tog-a")
    .to("#card-two", { top: "42%" }, "tog-b")
    .to("#card-one", { scale: 0.9 }, "tog-b")
    .to("#card-three", { top: "130%" }, "tog-b")
    .to("#card-three", { top: "50%" }, "tog-c")
    .to("#card-two", { scale: 0.9 }, "tog-c")
    .to("#card-three", { scale: 0.9 }, "d");
});
