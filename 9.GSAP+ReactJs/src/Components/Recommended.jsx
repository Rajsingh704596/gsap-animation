//!  contextSafe - ensures the animation runs safely within React's lifecycle
//# It automatically cleans up (kills) the animation if the component unmounts,
//# preventing memory leaks or DOM errors.

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Recommended = () => {
  const boxRef = useRef();
  const rotationRef = useRef(0); // track rotation value

  const { contextSafe } = useGSAP();

  //^ Use contextSafe when using ref + event handler to avoid memory leaks
  const rotateBox = contextSafe(() => {
    rotationRef.current += 360;
    gsap.to(boxRef.current, {
      rotate: rotationRef.current,
      duration: 1,
      ease: "power2.inOut",
    });
  });

  return (
    <div>
      <h1>Recommended</h1>
      <p>
        contextSafe is a method from useGSAP() that ensures GSAP animations run
        safely within the React component lifecycle — meaning:
      </p>
      <ol>
        <li>
          It prevents memory leaks by tying animations to the component's
          lifecycle.
        </li>

        <li>
          If the component unmounts, it automatically kills or cancels any
          ongoing animation or timeline that used it.
        </li>
        <li>
          it ensures the DOM node (ref.current) is still available at the time
          of animation — no null errors.
        </li>
      </ol>
      <button onClick={rotateBox}>Animate</button>
      <div ref={boxRef} className="box">
        Box
      </div>
    </div>
  );
};

export default Recommended;

//$ ✅ When to use contextSafe()
// - Animation is inside event handler (e.g. onClick, onHover)
// - You're using ref.current in animation
// - Animation may run after component unmount (e.g. delay, repeat)
// - You want automatic cleanup for safety

//$ ❌ When NOT to use contextSafe()
// - You're using useGSAP(() => { ... }) — already managed internally
// - Animation runs only once at mount (no user interaction)
// - You're not using refs (e.g. animating via class name or selector)
// - There's no async or delayed animation
