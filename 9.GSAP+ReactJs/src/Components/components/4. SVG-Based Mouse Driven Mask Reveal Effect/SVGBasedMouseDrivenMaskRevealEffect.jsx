import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./mask.css";

gsap.registerPlugin(useGSAP);

export default function SVGBasedMouseDrivenMaskRevealEffect() {
  const container = useRef(null);
  const [isHover, setIsHover] = useState(false);

  useGSAP(
    () => {
      const maskElement = document.querySelector(".mask-text");

      const svgSizes = {
        small: 20,
        large: 300,
      };

      const handleMouseMove = (e) => {
        const size = isHover ? svgSizes.large : svgSizes.small;
        gsap.to(maskElement, {
          duration: 0.3,
          maskSize: `${size}px`,

          // update time fun run
          onUpdate: () => {
            maskElement.style.maskPosition = `${e.clientX - size / 2}px ${
              e.clientY - size / 2
            }px`;
          },
        });
      };

      document.addEventListener("mousemove", handleMouseMove); // when mouse move fun call

      return () => document.removeEventListener("mousemove", handleMouseMove);
    },
    {
      scope: container,
      dependencies: [isHover],
      revertOnUpdate: true,
    }
  );

  return (
    <div id="main" ref={container}>
      <div className="mask-text">
        <p
          className="hover-text"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          Full Stack Web Development (MERN Stack) - Frontend + Backend +
          Deployment
        </p>
      </div>
      <div className="normal-text">
        <p>
          Using <span>GSAP</span> Text Reveal Hover — SVG Circle shows masked
          text
        </p>
      </div>
    </div>
  );
}
