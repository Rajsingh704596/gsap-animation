import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// EasePack Plugin
import { RoughEase, SlowMo, ExpoScaleEase } from "gsap/EasePack";

// Custom Extra Eases Plugin
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";

// Plugin Registration
gsap.registerPlugin(
  useGSAP,
  RoughEase,
  SlowMo,
  ExpoScaleEase,
  CustomEase,
  CustomBounce,
  CustomWiggle
);

// All easing configurations to demonstrate
const easeConfigs = [
  // Core eases
  "none", // Linear — no easing (constant speed)
  "power1.in", // Slight acceleration (slow start, fast end)
  "power1.out", // Slight deceleration (fast start, slow end)
  "power1.inOut", // Mild ease-in and ease-out
  "power2.in", // Medium acceleration
  "power2.out", // Medium deceleration
  "power2.inOut", // Medium ease-in and out
  "power3.in", // Strong acceleration
  "power3.out", // Strong deceleration
  "power3.inOut", // Strong ease-in and out
  "power4.in", // Very strong acceleration (starts very slow)
  "power4.out", // Very strong deceleration (ends very slow)
  "power4.inOut", // Extreme ease-in and ease-out
  "back.in(1.7)", // Starts by going backward before moving forward
  "back.out(1.7)", // Overshoots target then comes back
  "back.inOut(1.7)", // Backward at start + overshoot at end
  "bounce.in", // Bounces at the beginning (reverse gravity)
  "bounce.out", // Bounces at the end (like dropping a ball)
  "bounce.inOut", // Bounce at both start and end
  "circ.in", // Circular curve — slow start, fast finish
  "circ.out", // Circular — fast start, slow finish
  "circ.inOut", // Circular in and out
  "elastic.in(1,0.3)", // Elastic snap at start (rubber band feel)
  "elastic.out(1,0.3)", // Elastic snap at end
  "elastic.inOut(1,0.3)", // Elastic snap at both ends
  "expo.in", // Extreme acceleration — starts from near-zero speed
  "expo.out", // Extreme deceleration — ends very slowly
  "expo.inOut", // Explosive start and stop
  "sine.in", // Sinusoidal ease-in — smooth and natural
  "sine.out", // Sinusoidal ease-out — smooth and natural
  "sine.inOut", // Sinusoidal ease both in and out
  "steps(12)", // Discrete steps (useful for sprite animations)

  // EasePack (extra plugin eases)
  "rough({ points:20 })", // Jittery / chaotic motion (shaky or hand-drawn feel)
  "slow(0.7, 0.7)", // Slow at both ends, fast in the middle
  "expoScale(0.3, 2)", // Exponential scaling between 2 values (e.g. zoom/scale)

  // Custom Eases (advanced control)
  "customEase", // Custom cubic Bezier curve (manually defined)
  "customBounce", // Custom bounce (adjust strength & squash)
  "customWiggle", // Custom wiggle (number of wiggles + type)
];

// Reusable animation box component
const AnimatedBox = ({ ease, delay = 0, label }) => {
  // if delay not pass then delay value is 0 for 2nd component
  const boxRef = useRef();

  // Helper function to resolve the easing value (custom or default)
  const resolveEase = (ease) => {
    if (ease === "customEase") {
      return CustomEase.create("custom", "M0,0 C0.25,0.1 0.25,1 1,1");
    }
    if (ease === "customBounce") {
      return CustomBounce.create("custBounce", { strength: 2, squash: 1 });
    }
    if (ease === "customWiggle") {
      return CustomWiggle.create("custWiggle", {
        wiggles: 6,
        type: "easeInOut",
      });
    }
    return ease;
  };

  useGSAP(() => {
    gsap.fromTo(
      boxRef.current,
      // initial state
      { x: 200, backgroundColor: "#3498db" },
      // final state
      {
        x: 1200,
        backgroundColor: "#e74c3c",
        duration: 5,
        delay,
        ease: resolveEase(ease),
      }
    );
  }, [ease]);

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
      <div
        ref={boxRef}
        style={{
          width: 80,
          height: 30,
          backgroundColor: "#3498db",
          margin: 10,
        }}
      />
      <span style={{ fontSize: 14 }}>{label || ease}</span>
    </div>
  );
};

// Main animation showcase component
const EaseAnimation = () => {
  return (
    <section>
      {/* List of all eases with animations */}
      <div>
        {easeConfigs.map((ease, i) => (
          <AnimatedBox key={i} ease={ease} delay={i * 5} />
        ))}
      </div>

      {/* 2nd example in dropdown */}
      <EaseDropdownAnimation easeConfigs={easeConfigs} />
    </section>
  );
};

export default EaseAnimation;

// Dropdown-controlled animation component
export const EaseDropdownAnimation = ({ easeConfigs }) => {
  const [selectedEase, setSelectedEase] = useState("power1.in");

  return (
    <div style={{ padding: 20 }}>
      <h3>GSAP Ease Playground</h3>

      {/* dropdown */}
      <select
        value={selectedEase}
        onChange={(e) => setSelectedEase(e.target.value)}
        style={{ padding: 3, fontSize: 16, margin: 20 }}
      >
        {easeConfigs.map((ease, i) => (
          <option key={i} value={ease}>
            {ease}
          </option>
        ))}
      </select>

      {/* reuses same animation component , here delay not need to pass*/}
      <AnimatedBox ease={selectedEase} label={`Dropdown: ${selectedEase}`} />
    </div>
  );
};
