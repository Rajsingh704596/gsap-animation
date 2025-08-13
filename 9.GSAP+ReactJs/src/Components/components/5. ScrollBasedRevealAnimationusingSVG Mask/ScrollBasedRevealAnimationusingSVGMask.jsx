import "./svgmask.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ScrollBasedRevealAnimationusingSVGMask = () => {
  const refContainer = useRef();
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refContainer.current,
          start: "50% 50%",
          end: "250% 50%",
          scrub: true,
          pin: true,
          pinSpacing: false, // Prevent extra space after the pin is released
          markers: true,
        },
      });

      tl.to(
        ".svg",
        {
          "mask-size": "250%",
        },
        "svgimg1tog"
      );

      tl.to(
        ".img",
        {
          backgroundSize: "100%", // means cover
        },
        "svgimg1tog"
      );

      tl.to(
        ".svg2",
        {
          "mask-size": "250%",
        },
        "svgimg2tog"
      );

      tl.to(
        ".img2",
        {
          backgroundSize: "100%",
        },
        "svgimg2tog"
      );
    },
    {
      scope: refContainer,
    }
  );

  return (
    <div ref={refContainer}>
      <div id="main">
        <h1>Scroll Reveal Animation using SVG Mask and GSAP</h1>

        <div className="svg">
          {/*  image we pass background image  */}
          <div className="img">
            {/*  inside image another image show   */}
            <div className="svg2">
              <div className="img2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBasedRevealAnimationusingSVGMask;
