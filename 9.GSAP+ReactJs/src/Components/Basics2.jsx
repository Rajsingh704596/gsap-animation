import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Basics2 = () => {
  const elmRef = useRef();

  const containerRef = useRef();

  //^ useGSAP we can pass fun. and also other properties like Scope
  useGSAP(
    function () {
      gsap.from(".box", {
        // so here only container1 wala hi .box run hoga scope se
        y: 300,
        opacity: 0,
        rotate: 720,
        duration: 1,
        delay: 1,
      });

      gsap.from(elmRef.current, {
        // but here it's work container 2 because ref value always apply on single element so it's also run , here scope property not affect
        scale: 0,
        opacity: 0,
        delay: 1,
        duration: 1,
      });
    },
    // { scope: ".container1" } //.container1 k ander hi jo .box class hoga uss pr chalega
    { scope: containerRef } // scope container Ref or inside tk work karega only (jo ki container1 div hai) // note- here scope time not use .current when useRef value
  );

  return (
    <>
      <h1>
        .class , useRef target element and scope property also use in useGSAP()
        hook
      </h1>
      <section className="container">
        <div ref={containerRef} className="container1">
          <div className="circle"></div>
          <div className="box"></div>
        </div>
        <div className="container2">
          <div ref={elmRef} className="circle"></div>
          <div className="box"></div>
        </div>
      </section>
    </>
  );
};

export default Basics2;
