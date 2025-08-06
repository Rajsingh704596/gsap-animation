//! GSAP-based Smooth Full Page Parallax Scroll Sections with Image Snap & Text Reveal

//^ 1st way - using img tag
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

// Register all GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function FullPageParallaxSnap() {
  const container = useRef();

  // Section data (title + background image)
  const SECTIONS = [
    {
      id: "sec1",
      title: "Nature",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      id: "sec2",
      title: "Forest",
      bg: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      id: "sec3",
      title: "Waterfall",
      bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: "sec4",
      title: "Mountains",
      bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      id: "sec5",
      title: "Beach",
      bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
  ];

  // Main GSAP setup
  useGSAP(
    () => {
      // Setup smooth scrolling
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.3,
        smoothTouch: 0.3,
        effects: true,
        normalizeScroll: true,
      });

      // Animate each heading when the section comes into view
      gsap.utils.toArray("section").forEach((section) => {
        const title = section.querySelector("h2");
        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 100, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top center+=50",
                end: "center center",
                scrub: true,
              },
            }
          );
        }
      });

      // Enable snap-to-section effect
      ScrollTrigger.create({
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: 1 / (SECTIONS.length - 1),
          duration: 0.7,
          ease: "power2.inOut",
        },
      });

      // Cleanup GSAP instances on unmount
      return () => {
        smoother.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: container }
  );

  // Inline styles for simplicity (can move to CSS module or Tailwind)
  const css = {
    section: {
      position: "relative",
      height: "100vh",
      overflow: "hidden",
    },
    backgroundWrapper: {
      position: "absolute",
      width: "100%",
      height: "120%",
      top: "-10%",
      left: 0,
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 0,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      position: "absolute",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
      zIndex: 1,
    },
    title: {
      position: "relative",
      color: "#fff",
      textTransform: "uppercase",
      letterSpacing: "0.5em",
      mixBlendMode: "difference",
      zIndex: 2,
      textAlign: "center",
      textShadow: "0 0 20px rgba(0,0,0,0.7)",
      fontSize: "clamp(2rem, 5vw, 6rem)",
      fontWeight: "bold",
      padding: "0 1rem",
    },
  };

  return (
    <>
      <div ref={container}>
        {/* Smooth wrapper is required by ScrollSmoother */}
        <div
          id="smooth-wrapper"
          style={{ overflow: "hidden", position: "relative" }}
        >
          <div id="smooth-content">
            {SECTIONS.map(({ id, title, bg }) => (
              <section key={id} id={id} style={css.section}>
                <div style={css.backgroundWrapper} data-speed="0.5">
                  {/* Background image */}
                  <img src={bg} alt={title} style={css.image} loading="lazy" />

                  {/* Gradient overlay */}
                  <div style={css.overlay}></div>

                  {/* Section title */}
                  <h2 style={css.title}>{title}</h2>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

//^ 2nd way using background Image

// export function FullPageParallaxSnap2() {
//   const container = useRef();

//   useGSAP(
//     () => {
//       const smoother = ScrollSmoother.create({
//         wrapper: "#smooth-wrapper",
//         content: "#smooth-content",
//         smooth: 1.3,
//         smoothTouch: 0.3,
//         effects: true,
//         normalizeScroll: true,
//       });

//       gsap.utils.toArray("section").forEach((section) => {
//         gsap.fromTo(
//           section.querySelector("h1"),
//           { opacity: 0, y: 100 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             //^ create snap for entire content
//             ScrollTrigger: {
//               trigger: "#smooth-content",
//               start: "top top",
//               end: "bottom bottom",

//               snap: {
//                 snapTo: 1 / (SECTIONS.length - 1),
//                 duration: 0.7,
//                 ease: "power2.inOut",
//               },
//             },
//           }
//         );
//       });

//       return () => {
//         smoother.kill();
//         ScrollTrigger.getAll().forEach((t) => t.kill());
//       };
//     },
//     { scope: container } // important for React scope
//   );

//   const SECTIONS = [
//     {
//       id: "sec1",
//       title: "Nature",
//       bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//     },
//     {
//       id: "sec2",
//       title: "Forest",
//       bg: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
//     },
//     {
//       id: "sec3",
//       title: "Waterfall",
//       bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//     },
//     {
//       id: "sec4",
//       title: "Mountains",
//       bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//     },
//     {
//       id: "sec5",
//       title: "Beach",
//       bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//     },
//   ];

//   const css = {
//     section: {
//       position: "relative",
//       height: "100vh",
//       overflow: "hidden",
//     },
//     background: {
//       position: "absolute",
//       width: "100%",
//       height: "120%",
//       bottom: 0,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1,
//     },
//     title: {
//       color: "#fff",
//       fontSize: "5vw",
//       textTransform: "uppercase",
//       letterSpacing: "0.5em",
//       zIndex: 2,
//       mixBlendMode: "difference",
//     },
//   };

//   return (
//     <div ref={container}>
//       <div
//         id="smooth-wrapper"
//         style={{ position: "relative", overflow: "hidden" }}
//       >
//         <div id="smooth-content">
//           {SECTIONS.map(({ id, title, bg }) => (
//             <section key={id} id={id} style={css.section}>
//               (
//               <div
//                 data-speed="0.5"
//                 style={{ ...css.background, backgroundImage: `url(${bg})` }}
//               >
//                 <h2 style={css.title}>{title}</h2>
//               </div>
//               )
//             </section>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//! Best practice (img vs backgroundImage) -
// | Use Case            | Use `<img />` Tag          | Use `backgroundImage` CSS        |
// | ------------------- | ---------------------------| ---------------------------------|
// | Lazy loading        | ✅ Yes                     | 🚫 No native support            |
// | SEO / accessibility | ✅ Yes (with `alt`)        | 🚫 No                           |
// | Better for effects  | ❌ Less flexibility        | ✅ we can add blending, filters |
// | Animating bg        | ❌ Not easy with `<img />` | ✅ Better with `backgroundImage`|
