// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  // gsap code here!

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#main",
      start: "50% 50%",
      end: "200% 50%",
      scrub: true,
      pin: true,
      markers: true,
    },
  });

  tl.to(
    ".svg",
    {
      maskSize: "250%",
    },
    "svgimg1tog"
  );

  tl.to(
    ".img",
    {
      backgroundSize: "100%", // means cover
    },
    "svgimg1tog"
  );

  tl.to(
    ".svg2",
    {
      maskSize: "250%",
    },
    "svgimg2tog"
  );

  tl.to(
    ".img2",
    {
      backgroundSize: "100%",
    },
    "svgimg2tog"
  );
});
