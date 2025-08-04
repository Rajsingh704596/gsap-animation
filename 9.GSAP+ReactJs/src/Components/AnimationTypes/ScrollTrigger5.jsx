//! ScrollTrigger Plugin

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ScrollTrigger5 = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      //@ 1.way-  Simple way
      // gsap.to(".page2 h1", {
      //   x: 500,
      //   duration: 1,
      //   scrollTrigger: ".page2 h1", //trigger element page 2 inside h
      // });

      //@ 2.way- timeline with scrollTrigger
      const tl = gsap.timeline({
        // we can add it to an entire timeline!
        scrollTrigger: {
          trigger: ".page2 .title",
          start: "top 80% ", // first value represent element start point , second value is browser start position which is fixed (when both cross animation trigger)  <element-start> <viewport-start>
          end: "bottom 20%", // end point must be higher than start point   <element-end> <viewport-end>
          scrub: 2, // smooth scrubbing, takes 2 second to "catch up" to the scrollbar
          //pin: true, // pin the trigger element while active
          markers: true,
        },
      });

      tl.from(".title", {
        opacity: 0,
        duration: 1,
      });

      tl.from(".left", {
        x: -500,
        opacity: 0,
        duration: 3,
        ease: "power3.inOut",
        stagger: 1,
      }).from(".right", {
        x: 500,
        opacity: 0,
        duration: 3,
        ease: "power3.inOut",
        stagger: 1,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div
        className="page1"
        style={{ width: "100%", height: "100vh", backgroundColor: "black" }}
      >
        <h1>ScrollTrigger Plugin | GSAP Animation</h1>
      </div>
      <div
        className="page2"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "lightpink",
        }}
      >
        <h1>Rock Web Developer</h1>

        <h2 className="title">hello world</h2>

        <div style={{ fontSize: "60px", textAlign: "center" }}>
          <h2 className="left">hello world</h2>
          <h2 className="right">hello world</h2>
          <h2 className="left">hello world</h2>
          <h2 className="right">hello world</h2>
        </div>
      </div>
    </div>
  );
};

export default ScrollTrigger5;

//! Scroll trigger start and end point e.g

// | Use Case           | Start / End                   | Notes                             |
// | ------------------ | ----------------------------- | ----------------------------------|
// | Fade in / Slide in | `"top 80%" / "bottom 20%"`    |  Best for scroll reveal           |
// | Pinned section     | `"top top" / "+=1000"`        |  Best for pinning                 |
// | Scroll-parallax    | `"top bottom" / "bottom top"` |  Best for scrub linked animations |
// | Universal default  | `"top 75%" / "bottom 25%"`    |  Safe default for all cases       |
