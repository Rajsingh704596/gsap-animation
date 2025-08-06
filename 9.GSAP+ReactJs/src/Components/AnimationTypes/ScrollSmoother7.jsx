//! ScrollSmoother Plug In - Page scrolling smooth,native and fluid, while also allowing to easily apply scroll-based effects like parallax and lag( It's work with ScrollTrigger Plug in )

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

//  Register plug in
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function ScrollSmoother7() {
  const wrapperRef = useRef();
  const contentRef = useRef();

  useGSAP(
    () => {
      // ^ Create scroll smoother
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2, // Smooth duration (higher = more easing)
        smoothTouch: 0.3, // Optional: smooth on mobile
        effects: true, // Enable data-speed and data-lag effects
      });

      // Optional: Scroll velocity logging
      console.log("Scroll velocity:", smoother.getVelocity());

      // ^ Cleanup on unmount
      return () => {
        smoother.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: wrapperRef } // Scope ensures selectors work correctly
  );

  //  for styling
  const sectionStyle = (bg) => ({
    height: "120vh",
    background: bg,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const textStyle = {
    fontSize: "2.5rem",
    color: "#fff",
    textAlign: "center",
  };

  const boxStyle = {
    width: "140px",
    height: "140px",
    background: "#fff",
    color: "#000",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    borderRadius: "8px",
  };

  return (
    <div ref={wrapperRef} id="smooth-wrapper" style={{ position: "relative" }}>
      <div ref={contentRef} id="smooth-content">
        {/*  <!--- All content here which want to Effect ---> */}

        {/* Section 1: Normal intro */}
        <section style={sectionStyle("#f39c12")}>
          <h1 style={textStyle}>👇 Scroll Down</h1>
        </section>

        {/* Section 2: Parallax effect */}
        <section style={sectionStyle("#2ecc71")}>
          <div data-speed="0.5" style={textStyle}>
            ✨ Parallax Element (data-speed="0.5") scroll slow
          </div>
          <div data-speed="2" style={textStyle}>
            ✨ Parallax Element (data-speed="2") scroll fast
          </div>
        </section>

        {/* Section 3: Lag effect */}
        <section style={sectionStyle("#8e44ad")}>
          <div data-lag="0.4" style={boxStyle}>
            🐢 Lag Box (data-lag="0.4")
          </div>
        </section>
      </div>
    </div>
  );
}
