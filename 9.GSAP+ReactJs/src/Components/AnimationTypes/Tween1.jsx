//! Methods for creating a Tween (all of these methods return a Tween instance):
//# gsap.to()  -  initial position to final position animation perform, here we define final state
//# gsap.from() -  animate from a defined initial state to the current/default state (already in DOM)
//# gsap.fromTo()- define both initial and final states explicitly and animate between them

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Tween1 = () => {
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    //^ 1. gsap.from(): Animate heading from y: -50, opacity 0 → to original position  {Animate FROM an initial state (to current/default state)}
    gsap.from(headingRef.current, {
      y: -50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });

    //^ 2. gsap.fromTo(): Animate image from scale 0.8 and opacity 0 → to scale 1 and opacity 1
    gsap.fromTo(
      imageRef.current, //target element
      { scale: 0.8, opacity: 0 }, // initial state
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.3 } // final state
    );
  }, []);

  //^ 3. gsap.to(): Button hover effect   {Animate TO a final state (from current/default state)}
  const handleHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  return (
    <section
      style={{
        padding: "80px 5%",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1 ref={headingRef} style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Learn <span style={{ color: "#2ecc71" }}>GSAP</span> Tweens
      </h1>

      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800"
        alt="Animated"
        style={{
          width: "400px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      />

      <br />

      <button
        ref={buttonRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        style={{
          padding: "14px 28px",
          fontSize: "1rem",
          borderRadius: "30px",
          border: "none",
          backgroundColor: "#2ecc71",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        Hover Me
      </button>
    </section>
  );
};

export default Tween1;
