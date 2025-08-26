document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress");

  const masterTl = gsap.timeline();
  //^ e.g 1
  // Preloader animation
  masterTl.to(".preloader", {
    delay: 1.5,
    y: "-100%",
    duration: 1,
    ease: "power2.inOut",
  });

  // Show main content briefly (optional step)
  masterTl.to(".content", {
    opacity: 1,
    duration: 1,
  });

  //^ e.g 2
  // Heading + progress animation
  masterTl.to(
    progress,
    {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    },
    "start"
  );

  masterTl.from(
    ".heading",
    {
      y: -200,
      opacity: 0,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
    },
    "start"
  );

  masterTl.to(progress, {
    height: "100%",
    top: 0,
    duration: 1,
    backgroundColor: "white",
  });

  //This is the KEY step: Hide everything except .content-2 and show it
  masterTl.set([".preloader", ".content", ".heading", ".progress"], {
    display: "none",
  });

  masterTl.to("body", { backgroundColor: "white", duration: 0 }); // Set bg white

  masterTl.to(".content-2", {
    opacity: 1,
    duration: 1,
  });
});
