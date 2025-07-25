import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Basics2 = () => {
  const elmRef = useRef();

  useGSAP(function () {
    gsap.from(".box", {
      y: 300,
      opacity: 0,
      rotate: 720,
      duration: 1,
      delay: 1,
    });

    gsap.from(elmRef.current, {
      scale: 0.2,
      opacity: 0,
      delay: 1,
      duration: 1,
    });
  });
  return (
    <>
      <section className="container">
        <div className="container1">
          <div ref={elmRef} className="circle"></div>
          <div className="box"></div>
        </div>
        <div className="container2">
          <div className="circle"></div>
          <div className="box"></div>
        </div>
      </section>
    </>
  );
};

export default Basics2;
