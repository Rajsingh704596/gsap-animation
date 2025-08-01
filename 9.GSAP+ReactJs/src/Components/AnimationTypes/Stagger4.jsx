//! Stagger Animation -  only apply same element or same class

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { useRef } from "react";

gsap.registerPlugin(useGSAP); // useGSAP plugin

const Stagger4 = () => {
  //   const containerRef = useRef(); //  create a ref
  useGSAP(
    () => {
      gsap.from(".btn", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.inOut", // Smooth motion of each element   // <-- this controls actual motion

        //@ 1st way (Normal)
        //   stagger: 0.5, // Note- stagger apply only same element / class
        //   filter: "blur(5px)",

        //@ 2nd way (stagger properties - used for start stagger from which element )
        stagger: {
          //grid: [3, 3], // grid property set up
          grid: "auto", // Tell GSAP the layout is a grid (it calculates rows/cols)

          from: "start", //Start staggering from this point e.g- "start", "center", "end", "edges", "random", 3 (index)

          //^ Note- amount and each only one property use not both
          //amount: 1.5, // Total time to spread across all animations in stagger

          each: 0.2, // Delay between each element's animation (e.g., 0.2s between each)

          //axis: "x", // show in axis basis , here we pass "y" axis , by default it's null

          ease: "power2.inOut", // (Optional) For custom stagger timing spread , Smarter distribution of delays between each start  // <-- this controls *when* each one starts
        },
      });
    }
    // { scope: containerRef }     //  attach scope only inside this work
  );

  return (
    <section
      //   ref={containerRef} //  ref attached here
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4rem 2rem",
        backgroundColor: "#f5f7fa",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>
        Stagger Animation
      </h1>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "#555" }}>
        Professional Skills
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {[
          "Web Development",
          "App Development",
          "Cloud Computing",
          "Web Design",
          "SEO",
          "Video Editing",
          "Content Creator",
          "Leadership",
          "Time Management",
        ].map((skill, index) => (
          <div
            key={index}
            className="btn"
            style={{
              padding: "1.2rem",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              fontWeight: "600",
              color: "#333",
              fontSize: "1rem",
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stagger4;

//$ Best Practices with All stagger properties:
// Avoid giving both each and amount
//  Use each when we want fixed spacing between elements (e.g., 0.1s).
//  Use amount if we want total duration fixed regardless of number of items.
//  For grid layouts, use grid: "auto" — GSAP will auto-detect rows/columns.
//  Use from: "center" or from: "edges" for visually appealing spreads.
//  Always pair with ease like "power2" or "expo" for natural flow.
//  Avoid very large each delays unless needed — can feel too slow.
