//! ScrollToPlugin is used for smooth scrolling (like a slider) of the window or a div when a link or button is clicked and we want to animate the scroll to a specific section.

import { useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin); //  Register ScrollToPlugin

export default function ScrollTo6() {
  // Refs for scrollable container and sections
  const containerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Smooth scroll handler using GSAP
  const scrollToSection = (e, ref) => {
    e.preventDefault();

    //  Check both container and target section exist
    if (containerRef.current && ref.current) {
      gsap.to(containerRef.current, {
        duration: 1, // 1 second animation
        scrollTo: {
          y: ref.current, // scroll to this element inside container
          offsetY: 50, // offset to leave space from top (for fixed navbar)
        },
        ease: "power2.out", // easing function for smooth feel
      });
    }
  };

  // Styles for navbar, links, and sections
  const navStyle = {
    position: "fixed", // fixed to top
    top: 0,
    width: "100%",
    background: "#222",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    zIndex: 1000,
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "10px 20px",
    backgroundColor: "#444",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const sectionStyle = (bgColor) => ({
    height: "100vh",
    background: bgColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <>
      {/*  Top fixed navbar with links */}
      <nav style={navStyle}>
        <div>
          Scrolling inside Container Only Not Window screen using ScrollTo gsap
          plugin
        </div>
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, homeRef)}
          style={linkStyle}
        >
          Home
        </a>
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, aboutRef)}
          style={linkStyle}
        >
          About
        </a>
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, contactRef)}
          style={linkStyle}
        >
          Contact
        </a>
      </nav>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        style={{
          height: "100vh",
          overflowY: "auto",
          border: "1px solid #ccc",
          overflowX: "hidden",

          scrollBehavior: "auto", // disable native smooth scroll for GSAP
        }}
      >
        {/* Scroll target sections */}
        <section id="home" ref={homeRef} style={sectionStyle("lightcoral")}>
          <h1>Home</h1>
        </section>
        <section id="about" ref={aboutRef} style={sectionStyle("lightgreen")}>
          <h1>About</h1>
        </section>
        <section
          id="contact"
          ref={contactRef}
          style={sectionStyle("lightblue")}
        >
          <h1>Contact</h1>
        </section>
      </div>

      {/* component where without ScrollTo Plugin and GSAP scroll effect perform */}
      <ScrollWithPureJsWithoutScrollTo />
    </>
  );
}

//^ 2nd Way- component where without ScrollTo Plugin and GSAP scroll effect perform
const ScrollWithPureJsWithoutScrollTo = () => {
  const homeRef1 = useRef(null);
  const aboutRef1 = useRef(null);
  const contactRef1 = useRef(null);

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navStyle = {
    position: "sticky",
    top: 200,
    width: "100%",
    background: "#222",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px",
    zIndex: 1000,
  };

  const btnStyle = {
    color: "white",
    backgroundColor: "#555",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const sectionStyle = (bg) => ({
    height: "100vh",
    backgroundColor: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <>
      <nav style={navStyle}>
        <div> without ScrollTo Plugin with Pure Js</div>
        <button onClick={() => scrollTo(homeRef1)} style={btnStyle}>
          Home1
        </button>
        <button onClick={() => scrollTo(aboutRef1)} style={btnStyle}>
          About1
        </button>
        <button onClick={() => scrollTo(contactRef1)} style={btnStyle}>
          Contact1
        </button>
      </nav>

      <div style={{ paddingTop: "100px" }}>
        <section ref={homeRef1} style={sectionStyle("lightcoral")}>
          <h1>Home Section</h1>
        </section>
        <section ref={aboutRef1} style={sectionStyle("lightgreen")}>
          <h1>About Section</h1>
        </section>
        <section ref={contactRef1} style={sectionStyle("lightblue")}>
          <h1>Contact Section</h1>
        </section>
      </div>
    </>
  );
};
