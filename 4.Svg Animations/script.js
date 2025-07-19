// Stretch effect for the main bar at top
(function () {
  const string = document.querySelector("#string");
  const initialPath = "M 10 100 Q 500 100 990 100";
  const finalPath = initialPath;

  //^ event listener apply - mousemove , mouseleave  with dets value that provide x,y value  and y value basic we can change curve like 10 pr top jayega, 100 pr straight , 200 pr bottom ho jayega line

  string.addEventListener("mousemove", function (e) {
    //   console.log("move", e);
    const path = `M 10 100 Q ${e.offsetX} ${e.offsetY} 990 100`;
    //   console.log(path);
    // value will change based on mouse enter now this path apply in html using gsap

    gsap.to("#string svg path", {
      attr: { d: path }, //   gsap k through attribute ko change
      duration: 0.3,
      ease: "power3.out",
    });
  });

  string.addEventListener("mouseleave", function () {
    //   console.log("leave");
    gsap.to("#string svg path", {
      attr: { d: finalPath }, // so mouse leave hone final path set , so original position pr aa jayega
      duration: 1.5,
      ease: "elastic.out(1, 0.2)",
    });
  });
})();

// Beginner curve stretch using quadratic Bézier
(function () {
  const container = document.querySelector("#string1");
  const path = container.querySelector("path");
  const original = path.getAttribute("d");
  let rafId = null;

  container.addEventListener("mousemove", (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newPath = `M 10 100 Q ${x} ${y} 990 100`;

      gsap.to(path, {
        attr: { d: newPath },
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });

  container.addEventListener("mouseleave", () => {
    if (rafId) cancelAnimationFrame(rafId);
    gsap.to(path, {
      attr: { d: original },
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  });
})();

// Fixed wave that responds symmetrically to mouse movement
(function () {
  const container = document.querySelector("#wave-container");
  const path = container.querySelector("path");
  const originalD = path.getAttribute("d");
  let rafId = null;

  container.addEventListener("mousemove", (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const waveHeight = 60;
      const midX = 500;
      const midY = 100;

      const ctrlX = mouseX;
      const ctrlY = midY + (mouseY - midY) * 0.6;

      const newD = `M 10 100 Q ${ctrlX} ${ctrlY}, 500 100 T 990 100`;

      gsap.to(path, {
        attr: { d: newD },
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });

  container.addEventListener("mouseleave", () => {
    if (rafId) cancelAnimationFrame(rafId);
    gsap.to(path, {
      attr: { d: originalD },
      duration: 1,
      ease: "elastic.out(1, 0.4)",
    });
  });
})();

// Generic function to animate different kinds of SVG morphs
function makeStretchyLine(id, options) {
  const container = document.querySelector(`#${id}`);
  const path = container.querySelector("path");
  const original = path.getAttribute("d");
  let rafId = null;

  container.addEventListener("mousemove", (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      let d;

      switch (options.type) {
        case "cubic":
          d = `M 10 100 C ${relX} ${relY * options.mult} ${1000 - relX} ${
            relY * options.mult
          } 990 100`;
          break;

        case "blob":
          const topCtrl = 60 + (relY - 100) * options.mult;
          const bottomCtrl = 140 - (relY - 100) * options.mult;
          const sideShift = (relX - 500) * 0.1;

          d = `
            M200 ${topCtrl}
            C400 ${topCtrl - 40}, 600 ${topCtrl - 40}, 800 ${topCtrl}
            C850 ${100 + sideShift}, 850 ${100 - sideShift}, 800 ${bottomCtrl}
            C600 ${bottomCtrl + 40}, 400 ${bottomCtrl + 40}, 200 ${bottomCtrl}
            C150 ${100 - sideShift}, 150 ${100 + sideShift}, 200 ${topCtrl} Z
          `;
          break;

        case "pulsewave":
          const centerX = 500;
          const centerY = 100;
          const dist = Math.sqrt(
            Math.pow(relX - centerX, 2) + Math.pow(relY - centerY, 2)
          );
          const amp = Math.min(dist / 4, 80);

          d = `M 0 100 Q 250 ${100 - amp}, 500 100 T 1000 100`;
          break;

        default:
          d = original;
      }

      gsap.to(path, {
        attr: { d },
        duration: 0.2,
        ease: options.ease,
      });
    });
  });

  container.addEventListener("mouseleave", () => {
    if (rafId) cancelAnimationFrame(rafId);
    gsap.to(path, {
      attr: { d: original },
      duration: options.resetDur,
      ease: options.resetEase,
    });
  });
}

// Cubic smooth curve (S shape)
makeStretchyLine("string2", {
  type: "cubic",
  mult: 1.4,
  ease: "power2.out",
  resetDur: 1,
  resetEase: "elastic.out(1, 0.4)",
});

// Organic blob animation
makeStretchyLine("string3", {
  type: "blob",
  mult: 0.3,
  ease: "expo.out",
  resetDur: 1.5,
  resetEase: "elastic.out(1, 0.5)",
});

// Pulse wave with radial influence
makeStretchyLine("string4", {
  type: "pulsewave",
  mult: 1,
  ease: "expo.out",
  resetDur: 1.5,
  resetEase: "elastic.out(1, 0.6)",
});
