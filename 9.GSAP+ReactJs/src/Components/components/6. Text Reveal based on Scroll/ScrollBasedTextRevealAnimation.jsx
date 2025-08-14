import "./TextRev.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const TextRevealVariants = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: container.current,
        content: container.current.querySelector("#smooth-content"),
        smooth: 1.2,
        effects: true,
      });

      const scope = container.current;

      // 1. Word-by-word fade
      const w = scope.querySelector(".word-reveal");
      if (w) {
        const html = w.innerText
          .split(" ")
          .map((w) => " <span>" + w + "</span>")
          .join("");
        w.innerHTML = html;
        gsap.from(w.querySelectorAll("span"), {
          scrollTrigger: { trigger: w, start: "top 80%", scrub: true },
          opacity: 0,
          y: 20,
          stagger: 0.1,
        });
      }

      // 2. Gradient underline via CSS var
      const g = scope.querySelector(".gradient-reveal span");
      if (g) {
        gsap.fromTo(
          g,
          { "--progress": 0 }, // Starting value for the custom variable
          {
            "--progress": 1, // Ending value for the custom variable
            scrollTrigger: {
              trigger: g,
              start: "top 80%",
              end: "top 50%",
              scrub: 2,
            },
          }
        );
      }

      // 3. Slide + fade
      gsap.utils.toArray(".slide-fade").forEach((el) =>
        gsap.fromTo(
          el,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      );

      // 4. Responsive behavior using new method
      gsap.utils.toArray(".responsive-item").forEach((el) => {
        // Create ScrollTrigger for the element
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          scrub: true,
          markers: true, // For debugging
          onEnter: () => {
            // Check for the screen width and apply the correct animation based on that
            if (window.innerWidth >= 768) {
              gsap.fromTo(
                el,
                { x: -50, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 75%",
                    scrub: true,
                  },
                }
              );
            } else {
              gsap.fromTo(
                el,
                { opacity: 0 },
                {
                  opacity: 1,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }
          },
        });
      });

      // 5. 3D rotate words
      const r = scope.querySelector(".rotate-reveal");
      if (r) {
        const s = new SplitText(r, { type: "words" });
        gsap.from(s.words, {
          scrollTrigger: { trigger: r, start: "top 80%", scrub: true },
          rotationX: -120,
          opacity: 0,
          transformOrigin: "50% 0% -50",
          stagger: 0.05,
        });
      }

      // 6. Char-by-char fade-in
      const c = scope.querySelector(".char-reveal");
      if (c) {
        const s = new SplitText(c, { type: "chars" });
        gsap.from(s.chars, {
          scrollTrigger: { trigger: c, start: "top 85%", scrub: true },
          opacity: 0,
          y: 40,
          stagger: 0.02,
        });
      }

      // 7. Clip-path wipe
      const cp = scope.querySelector(".clip-reveal");
      if (cp) {
        gsap.from(cp, {
          clipPath: "inset(0 100% 0 0)",
          scrollTrigger: {
            trigger: cp,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
          ease: "power2.out",
        });
      }

      // 8. Blur-to-focus reveal (new)
      const bf = scope.querySelector(".blur-focus");
      if (bf) {
        const text = bf.innerText;
        bf.innerHTML = "";
        text.split("").forEach((ch) => {
          const span = document.createElement("span");
          span.style.display = "inline-block";
          span.style.opacity = 0;
          span.style.filter = "blur(8px)";
          span.innerText = ch;
          bf.appendChild(span);
        });
        gsap.to(bf.querySelectorAll("span"), {
          scrollTrigger: { trigger: bf, start: "top 80%", scrub: true },
          opacity: 1,
          filter: "blur(0)",
          y: 0,
          stagger: 0.05,
          ease: "power4.out",
        });
      }

      // 9. Flying & spinning chars (new)
      const fs = scope.querySelector(".fly-spin");
      if (fs) {
        const s = new SplitText(fs, { type: "chars" });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: fs,
              scrub: 1,
              pin: true,
              start: "top top",
              end: "+=500",
            },
          })
          .fromTo(
            s.chars,
            {
              rotateY: () => Math.random() * 180 + 180,
              xPercent: () => Math.random() * 100 - 50,
              yPercent: () => Math.random() * 100 - 50,
              scale: 0,
            },
            {
              rotateY: 0,
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              stagger: { amount: 1, from: "random" },
            }
          );
      }
      // 10. Clip-from-bottom lines/words (new)
      const cb = scope.querySelector(".clip-bottom");
      if (cb) {
        const s = new SplitText(cb, { type: "lines, words" });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: cb,
              start: "top 80%", // Trigger animation when 80% of the element is in view
              end: "top 20%", // End the animation after the element moves out of view
              scrub: 1, // Smooth animation sync with scroll
              markers: true, // Debugging markers

              pinSpacing: false, // This helps in preventing any extra white space caused by pinning
            },
          })
          .from(s.words, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)", // Clip from bottom
            yPercent: 50, // Start with text pushed downward
            opacity: 0, // Start with text invisible
            stagger: 0.1, // Delay between each word's animation
          })
          .to(s.words, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Fully reveal text
            yPercent: 0, // Move text to original position
            opacity: 1, // Make text fully visible
            stagger: 0.1, // Maintain stagger for smooth reveal
          });
      }

      return () => {
        smoother.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: container }
  );

  return (
    <div ref={container} id="smooth-wrapper">
      <div id="smooth-content">
        <section style={{ height: "100vh", padding: "50px" }}>
          <h1>Scroll Down ⬇</h1>
        </section>

        <section className="word-reveal" style={sectionStyle}>
          Word-by-word fade show reveal
        </section>
        <section className="gradient-reveal" style={sectionStyle}>
          <span>Gradient underline</span>
        </section>
        <section className="slide-fade" style={sectionStyle}>
          Slide & Fade
        </section>
        <section className="responsive-item" style={sectionStyle}>
          Responsive reveal
        </section>
        <section className="rotate-reveal" style={sectionStyle}>
          3D rotate words
        </section>
        <section className="char-reveal" style={sectionStyle}>
          Char-by-char fade
        </section>
        <section className="clip-reveal" style={sectionStyle}>
          Clip-path wipe
        </section>
        <section className="blur-focus" style={sectionStyle}>
          Blur to Focus Reveal
        </section>
        <section className="fly-spin" style={sectionStyle}>
          Flying & Spinning chars
        </section>
        <section className="clip-bottom" style={sectionStyle}>
          Clip-from-bottom-reveal
        </section>

        <TextRevealAnimation2 />
        <div style={{ height: "30vh" }}></div>
      </div>
    </div>
  );
};

const sectionStyle = { fontSize: "2rem", padding: "50px" };

export default TextRevealVariants;

export const TextRevealAnimation2 = () => {
  const containerRef2 = useRef(null);

  useGSAP(
    () => {
      // Initialize ScrollSmoother
      // ScrollSmoother.create({
      //   wrapper: "#smooth-wrapper",
      //   content: "#smooth-content",
      //   smooth: 1.2, // Adjust smoothness as needed
      //   effects: true,
      // });

      // First animation (second page)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".secondpage",
          start: "20% 50%",
          end: "120% 50%",
          scrub: 2,
          // markers: true,
        },
      });

      tl.to(".text-area-front", {
        width: "100%",
      });

      // Second animation (third page)
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".thirdpage",
          start: "0% 50%",
          end: "100% 50%",
          scrub: 1.5,
          // markers: true,
        },
      });

      tl2.to(".text-area-2 h1", { width: "100%" });
      tl2.to(".text-area-2 h2", { width: "100%" });

      // Cleanup ScrollTriggers on component unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef2 }
  ); // The empty dependency array means this effect runs once when the component mounts

  return (
    <div ref={containerRef2} id="smooth-wrapper">
      <div id="smooth-content">
        <div id="main-2">
          <div className="secondpage">
            {/* First Animation */}
            <div className="text-area-behind">
              <h1>
                Rock Full Stack Web Developer |<br /> MERN Stack | Next Js
              </h1>
            </div>
            <div className="text-area-front">
              <h1>
                Rock Full Stack Web Developer |<br /> MERN Stack | Next Js
              </h1>
            </div>
          </div>

          <div className="thirdpage">
            {/* Second Animation */}
            <div className="text-area-1">
              <h1>Rock Full Stack Web Developer</h1>
              <h2>MERN Stack | Next Js</h2>
            </div>
            <div className="text-area-2">
              <h1>Rock Full Stack Web Developer</h1>
              <h2>MERN Stack | Next Js</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
