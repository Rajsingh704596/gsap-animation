//! Scroll-triggered image swap/reveal transition -

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ScrollBasedImageSwap = () => {
  const containerRef = useRef();
  useGSAP(
    () => {
      //^   timeline -1 for  page 1 image
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#page1",
          start: "50% 50%",
          end: "+=500",
          markers: true,
          scrub: 2,
          pin: true, //#main trigger elemenet pin on screen when animation not done after end pin complete
        },
      });

      tl.to(".img-container", {
        width: "50%",
        ease: "power3.out",
      });

      //^   timeline -2 for  page 2 image
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#page2",
          start: "50% 50%",
          end: "+=500",
          markers: true,
          scrub: 2,
          pin: true, //#main trigger elemenet pin on screen when animation not done after end pin complete
        },
      });
      tl2.to(".img-container2", {
        height: "120%",
        ease: "power4.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef}>
      {/* page 1 image , image swap(change) horizontally using width*/}
      <div
        id="page1"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <h1 style={{ textAlign: "center", color: "black" }}>
          ScrollBased Image Swap
        </h1>
        <img
          src="images/wireframe.png"
          alt="Wireframe1"
          style={{ position: "absolute", height: "100%" }}
        />
        <div
          className="img-container"
          style={{
            position: "relative",
            width: "0%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src="images/photoreal-frame.avif"
            alt="wireframe2"
            style={{ position: "absolute", height: "100%" }}
          />
        </div>
      </div>
      {/* page 2  image, image swap(change) vertically using height*/}
      <div
        id="page2"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <h1 style={{ textAlign: "center", color: "black" }}>
          ScrollBased Image Swap
        </h1>
        <img
          src="images/wireframe.png"
          alt="Wireframe1"
          style={{ position: "absolute", width: "50%" }}
        />
        <div
          className="img-container2"
          style={{
            position: "relative",
            height: "0%",
            overflow: "hidden",
          }}
        >
          <img
            src="images/photoreal-frame.avif"
            alt="wireframe2"
            style={{ position: "absolute", width: "50%" }}
          />
        </div>
      </div>

      {/* page 3 */}
      <div
        style={{ width: "100%", height: "100vh", backgroundColor: "white" }}
      ></div>
    </section>
  );
};

export default ScrollBasedImageSwap;
