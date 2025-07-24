function page1Animation() {
  let tl = gsap.timeline();

  tl.from("nav h1, nav ul li, nav ul button ", {
    y: -50,
    opacity: 0,
    delay: 0.2,
    duration: 0.5,
    stagger: 0.2,
  });

  tl.from(".center-part1 h1", {
    x: -200,
    opacity: 0,
    duration: 0.8,
  });

  tl.from(".center-part1 p", {
    x: -100,
    opacity: 0,
    duration: 0.6,
  });

  tl.from(".center-part1 button ", {
    opacity: 0,
    duration: 0.6,
  });

  tl.from(
    ".center-part2 img",
    {
      x: 200,
      opacity: 0,
      duration: 0.8,
    },
    "-=0.7" // means element run in timeline but start before 0.7 sec
  );

  tl.from(".clients img", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
  });
}

function page2Animation() {
  //@ In page-2 Scroll Trigger apply for every element in section-2 class like this where we only trigger timeline

  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-2",
      scroller: "body",
      //   markers: true,
      start: "top 50%",
      end: "top -75%",
      scrub: 2,
    },
  });

  // now here we don't need to use scrollTrigger
  tl2.from(".section", {
    y: 30,
    opacity: 0,
    duration: 0.5,
  });

  //^if target element have multiple class so we write like this
  tl2.from(".elem.line-1.left", {
    x: -300,
    opacity: 0,
    duration: 1,
  });
  tl2.from(".elem.line-1.right", {
    x: 300,
    opacity: 0,
    duration: 1,
  });

  //^ but we want left or right both line run together so we use any same word like this-
  tl2.from(
    ".elem.line-2.left",
    {
      x: -300,
      opacity: 0,
      duration: 1,
    },
    "together" // here we pass any same word for line2
  );
  tl2.from(
    ".elem.line-2.right",
    {
      x: 300,
      opacity: 0,
      duration: 1,
    },
    "together" // here we pass any same word for line2
  );

  tl2.from(
    ".elem.line-3.left",
    {
      x: -300,
      opacity: 0,
      duration: 1,
    },
    "tog2" // same word for line 3 for together run in timeline
  );
  tl2.from(
    ".elem.line-3.right",
    {
      x: 300,
      opacity: 0,
      duration: 1,
    },
    "tog2" // same word for line 3 for together run in timeline
  );
}

page1Animation();
page2Animation();
