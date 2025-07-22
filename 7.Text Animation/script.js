function breakTheText() {
  let h1 = document.querySelector("h1");
  let h1Text = h1.textContent; // h1 inside text content select

  // console.log(h1Text);               //o/p- Rock Web Developer

  // Now string we need to break one by one , so we use .split method that change into array format on the basis of ("") nothing , if we pass here space then space basis word break but inside double cot nothing , so every thing is brake even space also.
  let splittedText = h1Text.split(""); // o/p-  ['R','o','c','k','','W','e','b','','D','e','v','e','l','o','p','e','r']

  let clutter = ""; // empty variable create

  //^ forEach loop apply in array , so every element iterate
  splittedText.forEach(function (element) {
    console.log("element", element);
    //   clutter = clutter + element;
    clutter += `<span>${element}</span>`; // here we use template literal so every element store in dom inside span tag
  });

  // console.log(clutter);         // o/p- <span>R</span> <span>o</span>...
  h1.innerHTML = clutter;
}

breakTheText();

//^ Now GSAP apply-
//@ it's run when span tag default display inline change into inline-block
gsap.from("h1 span", {
  y: 70, // final y axis 70px  to initial y axis 0px
  duration: 0.8,
  delay: 0.5,
  opacity: 0,
  stagger: 0.2, //one by one run on every 0.2 sec.
  //stagger: -0.2, // when negative value apply so vice-versa run means last element to first element animation run
});

//^ 2nd Animation (here half text start from left side  and half start from right side)
function breakTheTextInMid() {
  let h2 = document.querySelector("h2");
  let h2Text = h2.textContent; //h2 inside text select
  let splittedText = h2Text.split(""); // o/p-  ['R','o','c','k','','W','e','b','','D','e','v','e','l','o','p','e','r']

  // now array of element total length divide by 2 and math.floor we get half value in integer form -
  let halfValue = splittedText.length / 2;
  console.log(halfValue);

  let temp = ""; // empty variable create

  //^ forEach loop apply in array , so every element iterate
  splittedText.forEach(function (element, idx) {
    // console.log("element and id", element, idx); // here idx = index of element
    if (idx < halfValue) {
      temp += `<span class="left">${element}</span>`;
    } else {
      temp += `<span class="right">${element}</span>`;
    }
  });
  // console.log(clutter);
  h2.innerHTML = temp;
}
breakTheTextInMid();

//^ Now GSAP apply-
//@ it's run when span tag default display inline change into inline-block
gsap.from("h2 .left", {
  y: 50, // final y axis 70px  to initial y axis 0px
  duration: 0.8,
  delay: 0.5,
  opacity: 0,
  stagger: 0.15, //one by one run on every 0.15 sec.
});

gsap.from("h2 .right", {
  y: 50, // final y axis 70px  to initial y axis 0px
  duration: 0.8,
  delay: 0.5,
  opacity: 0,
  stagger: -0.15, // vice-versa run one by one run on every 0.15 sec.
});
