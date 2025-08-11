// after dom content load fun run
document.addEventListener("DOMContentLoaded", function () {
  // select the target class
  const hoverText = document.querySelector(".hover-text");
  const maskElement = document.querySelector(".mask-text-container");

  // initial value and it's must be let so its value will update
  let isHover = false;

  const svgSizes = {
    initial: 20,
    expanded: 400,
  };

  document.addEventListener("mousemove", function (e) {
    // ternary operator use
    const size = isHover ? svgSizes.expanded : svgSizes.initial;

    // using gsap target maskElement
    gsap.to(maskElement, {
      maskSize: `${size}px`,
      duration: 0.5,

      // update time fun run
      onUpdate: () => {
        maskElement.style.maskPosition = `${e.clientX - size / 2}px ${
          e.clientY - size / 2
        }px`;
      },
    });
  });

  // when mouse enter isHover value is true
  hoverText.addEventListener("mouseenter", () => {
    isHover = true;
  });

  // when mouse leave isHover value is false
  hoverText.addEventListener("mouseleave", () => {
    isHover = false;
  });
});
