//! Shape Morphing Using CSS Clip-Path + GSAP

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP); //^ Registers the useGSAP hook for React integration with automatic cleanup.

const MorphingImage = () => {
  const imageRef = useRef(null);

  // Both polygons have 9 points to ensure smooth morphing
  const initialClipPath =
    "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)";

  const hoveredClipPath =
    "polygon(30% 0%, 70% 0%, 100% 0%, 100% 100%, 70% 100%, 30% 100%, 0% 100%, 0% 0%, 30% 0%)";

  // Set initial state once when component mounts, gsap.set() is used to instantly set properties (without any animation).
  useGSAP(() => {
    gsap.set(imageRef.current, {
      clipPath: initialClipPath,
    });
  }, []);

  const { contextSafe } = useGSAP();

  // Smooth hover-in
  const handleMouseEnter = contextSafe(() => {
    gsap.to(imageRef.current, {
      clipPath: hoveredClipPath,
      duration: 1.2,
      ease: "power3.inOut",
    });
  });

  // Smooth hover-out
  const handleMouseLeave = contextSafe(() => {
    gsap.to(imageRef.current, {
      clipPath: initialClipPath,
      duration: 1.5,
      ease: "power3.inOut",
    });
  });

  return (
    <section style={{ textAlign: "center", marginTop: "20px" }}>
      <p style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Shape Morphing Using CSS Clip-Path + GSAP
      </p>
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1753637508642-af8f825bc16e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Morphing Image"
        width={600}
        height={500}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: "block",
          margin: "auto",
          objectFit: "cover",
        }}
      />
    </section>
  );
};

export default MorphingImage;
