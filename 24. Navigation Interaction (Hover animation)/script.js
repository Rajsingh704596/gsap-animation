document.addEventListener("DOMContentLoaded", () => {
  const links = gsap.utils.toArray("li a");

  //const links2 = document.querySelectorAll('li a')
  //console.log(links, links2)

  links.forEach((link) => {
    let linkTl = gsap.timeline({
      defaults: { ease: "power4.inOut", duration: 0.6 },
    });

    const headingStart = link.querySelector(".primary");
    const headingEnd = link.querySelector(".secondary");
    const date = link.querySelector(".date");
    const lineDash = link.querySelector(".line");

    linkTl
      .to(headingStart, {
        yPercent: -100,
      })
      .to(
        headingEnd,
        {
          yPercent: -50,
        },
        "<"
      )
      .to(
        lineDash,
        {
          scaleX: 1,
        },
        "<"
      )
      //.to(link, {
      //    backgroundColor: '#1C1C1C',
      //    duration: .1
      //}, "<")
      .to(
        date,
        {
          y: 0,
        },
        "<"
      );

    linkTl.pause();

    link.addEventListener("mouseenter", () => {
      linkTl.play();
    });
    link.addEventListener("mouseleave", () => {
      linkTl.reverse();
    });
  });
});
