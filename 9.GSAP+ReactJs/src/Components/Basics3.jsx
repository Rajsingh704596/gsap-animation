import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP); //^ Registers the useGSAP hook for React integration with automatic cleanup.

const Basics3 = () => {
  const [xValue, setXValue] = useState(0); //useState
  const [rot, setRot] = useState(0);
  const [yValue, setYValue] = useState(0);

  const boxRef = useRef();

  //^   GSAP random utils method used random(min, max, snap, allowRepeats)
  const random = gsap.utils.random(-500, 500, 10); // so here random value is between 500 to -500 and that divisible by 10 so e.g 10,20,..490  {only when component will re-render so we use useState hook}
  const rotateX = gsap.utils.random(-360, 360, 30);
  const randomY = gsap.utils.random(-500, 500, 100);

  //@   1st way using array dependency
  //   useGSAP(() => {
  //     gsap.to(".circle", {
  //       x: xValue,
  //       duration: 1,
  //     });

  //     gsap.to(boxRef.current, {
  //       x: xValue,
  //       y: yValue,
  //       duration: 1,
  //       rotate: rot,
  //     });
  //   }, [xValue, rot, yValue]); //^ here must be pass array of dependency pass so when value,rot change gsap animation again run {same like useEffect}

  //@ 2nd way using scope in obj. and dependency inside change value pass
  useGSAP(
    () => {
      gsap.to(".circle", {
        x: xValue,
        duration: 1,
      });

      gsap.to(boxRef.current, {
        x: xValue,
        y: yValue,
        duration: 1,
        rotate: rot,
      });
    },
    { scope: "section", dependencies: [xValue, rot, yValue] } // here scope and dependency both pass
  );

  return (
    <section>
      <h1>
        GSAP have muliple utilities but here we use random()method that generate
        random no of parameters
      </h1>
      <h2>
        Gsap animation perform when array of dependency value change which is
        must be passed
      </h2>

      <p>
        initial value is 0, So when button click value will change, gsap
        animation run
      </p>
      <div>
        <button
          className="movebtn"
          onClick={() => {
            // console.log(random);
            setXValue(random); // setter fun store or update the value
            console.log(xValue);

            setRot(rotateX);

            setYValue(randomY);
          }}
        >
          Move
        </button>
        <div className="circle"></div>
        <div ref={boxRef} className="box"></div>
      </div>
    </section>
  );
};

export default Basics3;
