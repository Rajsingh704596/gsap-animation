// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!

  const menuToggle = document.querySelector(".menu-toggle");

  let menuStatus = false;

  const menuTL = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "power4.inOut",
    },
  });

  menuTL
    .to(["main", "aside"], {
      x: 0,
      stagger: 0.2,
      duration: 0.8,
    })
    .from(
      "aside ul li a",
      {
        xPercent: -100,
        stagger: 0.2,
      },
      "-=.4"
    );

  menuTL.paused(true);

  menuToggle.addEventListener("click", () => {
    if (!menuStatus) {
      menuTL.play();
      menuStatus = true;
    } else {
      menuTL.reverse();
      menuStatus = false;
    }
  });
});
