import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP); //^ Registers the useGSAP hook for React integration with automatic cleanup.

const Basics1 = () => {
  const gsapRef = useRef(); // useRef hook define

  //^ useGSAP hook define (Recommended)
  useGSAP(() => {
    //@ here gsap code define
    //^ 1way. target className of that element
    gsap.to(".box1", {
      x: 500,
      duration: 2,
      delay: 1,
    });

    //^ 2way. target ref (reference using useRef ) of that element
    gsap.to(gsapRef.current, {
      x: 1200,
      duration: 2,
      delay: 1,
      rotate: 720,
    });
  });

  return (
    <>
      <h1>Basic Animation apply in 2 way </h1>
      <div className="box1"></div>
      <div ref={gsapRef} className="box2"></div>
    </>
  );
};

export default Basics1;
