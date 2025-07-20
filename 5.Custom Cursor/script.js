// element select
let main = document.querySelector("#main");
let cursor = document.querySelector("#cursor");

// mousemove event listener apply on main element tag (page)
main.addEventListener("mousemove", function (e) {
  //   console.log(
  //     "mouse move event performed and we get value from e which depend on event and we get value x or y",
  //     e
  //   );
  // console.log("x axis value", e.x, "y axis value", e.y);

  //  now this value used in gsap for moving cursor
  gsap.to(cursor, {
    x: e.x,
    y: e.y,

    duration: 0.6,
    // ease: "back.out", //smoothness , here other property we can also try in ease visualizer
  });
});

//^ 2. image k div pr jaye to cursor k div m kya effect aaye -
//@ mouseenter event
let imageDiv = document.querySelector("#image");
imageDiv.addEventListener("mouseenter", function (e) {
  console.log("mouseenter");

  cursor.innerHTML = "view more";

  gsap.to(cursor, {
    scale: 1.5, // jaise hi cursor imageDiv m aye to cursor size increase

    backgroundColor: "#ffffff9a",
  });
});
//@ mouseleave event
imageDiv.addEventListener("mouseleave", function (e) {
  console.log("mouseleave");

  cursor.innerHTML = "";
  gsap.to(cursor, {
    scale: 1,

    backgroundColor: "#fff",
  });
});
