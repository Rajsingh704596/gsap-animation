// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  // gsap code here!

  const tl1 = gsap.timeline({
    delay: 0.4,
    duration: 0.8,
  });
  tl1
    .from(".textarea h1", {
      y: 10,
      stagger: 0.5,
      opacity: 0,
      duration: 0.8,
    })
    .from(".textarea p", {
      y: 10,
      opacity: 0,
    })
    .from(".textarea a", {
      y: 10,
      opacity: 0,
    })
    .from(".textarea h2", {
      y: 10,
      opacity: 0,
    });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#main",
      markers: true,
      start: "50% 50%",
      end: "150% 50%",
      scrub: 1.5,
      pin: true,
    },
  });
  tl2
    .to(
      "#lineone",
      {
        marginTop: "-120vh",
      },
      "tog-2"
    )
    .to(
      "#linetwo",
      {
        marginTop: "20vh",
      },
      "tog-2"
    );
});
