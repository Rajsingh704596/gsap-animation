document.addEventListener("DOMContentLoaded", () => {
  // select the class
  const btn = document.querySelector(".btn");
  const letters = document.querySelectorAll(".stg");

  //   jb mouse se enter (hover) kare button pr then run
  btn.addEventListener("mouseenter", () => {
    // Kill any ongoing tweens on letters
    gsap.killTweensOf(letters);

    gsap.to(letters, {
      y: -48,
      duration: 0.25,
      stagger: 0.03,
      ease: "power3.out",
    });
  });

  //    jb mouse leave kare button se
  btn.addEventListener("mouseleave", () => {
    // Kill any ongoing tweens on letters and reset immediately
    gsap.killTweensOf(letters);

    gsap.set(letters, {
      y: 0,
    });
  });
});
