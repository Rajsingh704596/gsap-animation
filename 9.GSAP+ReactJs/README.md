# GSAP with React:

## Why GSAP with React?

- **Blazing Fast**: Up to 20x faster than jQuery, leveraging GPU-accelerated transforms.
- **Universal Compatibility**: Seamlessly integrates with React, Vue, WebGL, SVG, and more.
- **Free Plugins**: All premium plugins (e.g., ScrollTrigger, ScrollSmoother) are free as of April 2025.
- **React-Optimized**: The `@gsap/react` hook (`useGSAP`) simplifies integration with automatic cleanup.
- **Accessible**: Supports `prefers-reduced-motion` for inclusive designs.
- **Vibrant Community**: Extensive documentation, forums, and demos at [gsap.com](https://gsap.com).

## Project Setup

### Prerequisites

- **Node.js**: v16.8+ (latest LTS recommended).
- **npm or yarn**: For managing dependencies.
- **React**: v19+ for modern hooks (`useActionState`, `useOptimistic`).
- **Optional**: Code editor like VS Code.

### Step 1: Create a React Project with Vite

Vite offers fast builds and hot module replacement.

```bash
npm create vite@latest my-gsap-app -- --template react
cd my-gsap-app
npm install
npm run dev
```

Your app will run at `http://localhost:5173`.

### Step 2: Install GSAP

For React projects, install GSAP and the React hook via npm:

```bash
npm install gsap @gsap/react
```

For vanilla JavaScript or quick prototyping, use the CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<!-- Add other plugins as needed -->
```

### Step 3: Project Structure

A scalable structure for GSAP + React projects:

```
src/
  ├── App.jsx
  ├── components/
  │   ├── Hero.jsx
  │   ├── AnimatedList.jsx
  │   ├── ScrollSection.jsx
  ├── plugins/
  │   ├── gsapPlugins.js
  ├── utils/
  │   ├── animations.js
  ├── styles/
  │   ├── App.css
  └── index.html
package.json
```

### Step 4: Dependencies in `package.json`

Ensure these dependencies are included:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "gsap": "^3.13.0",
    "@gsap/react": "^2.1.1"
  }
}
```

## Getting Started with GSAP

### Option 1: Using `@gsap/react` with `useGSAP` (Recommended)

The `@gsap/react` package simplifies GSAP integration in React, handling scoping and cleanup automatically.

#### Example: Hero Section with Staggered Fade

```jsx
// src/components/Hero.jsx
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

function Hero() {
  const containerRef = React.useRef();

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="hero">
      <h1>Welcome to GSAP!</h1>
      <p>Create stunning animations with React.</p>
      <button>Learn More</button>
    </div>
  );
}

export default Hero;
```

**Key Points**:

- `useGSAP` replaces `useEffect` for animations, reducing boilerplate.
- The `scope` option ensures animations target only the component’s elements.
- Cleanup is automatic on component unmount.

### Option 2: Manual Setup with `useRef` and `useEffect`

For custom control or vanilla JavaScript compatibility:

#### Example: Staggered List Animation

```jsx
// src/components/AnimatedList.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function AnimatedList() {
  const listRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.inOut" }
      );
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <ul ref={listRef}>
      <li style={{ opacity: 0 }}>Feature 1</li>
      <li style={{ opacity: 0 }}>Feature 2</li>
      <li style={{ opacity: 0 }}>Feature 3</li>
    </ul>
  );
}

export default AnimatedList;
```

**Key Points**:

- Use `useRef` to reference DOM elements.
- `gsap.context()` scopes animations for easier management.
- Clean up with `ctx.revert()` to prevent memory leaks.

### Vanilla JavaScript Example (CDN)

For non-React projects or quick prototypes:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  </head>
  <body>
    <div class="box">Animate Me!</div>
    <script>
      gsap.to(".box", {
        x: 100,
        rotation: 360,
        duration: 1,
        ease: "bounce.out",
        repeat: -1,
        yoyo: true,
      });
    </script>
  </body>
</html>
```

## GSAP Plugins (All Free in 2025!)

Thanks to Webflow’s acquisition in April 2025, all previously premium GSAP plugins are now free. Below are the key plugins, their purposes, and React examples.

### 1. ScrollTrigger

- **Purpose**: Triggers animations based on scroll position (pinning, scrubbing, snapping).
- **Usage**: Ideal for parallax, reveals, and sticky sections.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function ScrollSection() {
  const sectionRef = useRef();
  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.5,
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="section">
      Scroll to Reveal!
    </div>
  );
}
```

### 2. ScrollSmoother

- **Purpose**: Enables smooth scrolling with parallax effects.
- **Usage**: Use `data-speed` or `data-lag` for parallax; combine with ScrollTrigger.
- **Example**:

```jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollSmoother);

function SmoothScroll() {
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div data-speed="0.6" className="parallax">
          Parallax Layer
        </div>
        <div>Content Below</div>
      </div>
    </div>
  );
}
```

### 3. SplitText

- **Purpose**: Splits text into characters, words, or lines for animations.
- **Usage**: Perfect for text reveals and typewriter effects. Updated in 2025 for 50% smaller file size and better accessibility.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

function TextReveal() {
  const textRef = useRef();
  useGSAP(
    () => {
      const split = new SplitText(textRef.current, { type: "chars, words" });
      gsap.from(split.chars, {
        y: 20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: textRef }
  );

  return <h1 ref={textRef}>Stunning Text Animation</h1>;
}
```

### 4. MorphSVGPlugin

- **Purpose**: Morphs SVG shapes for dynamic transitions.
- **Usage**: Transform logos, icons, or shapes.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

function MorphShape() {
  const svgRef = useRef();
  useGSAP(
    () => {
      gsap.to("#shape1", {
        morphSVG: "#shape2",
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: svgRef }
  );

  return (
    <svg ref={svgRef} width="100" height="100">
      <path id="shape1" d="M10 10 H 90 V 90 H 10 Z" fill="blue" />
      <path
        id="shape2"
        d="M50 10 A 40 40 0 0 1 50 90 Z"
        style={{ visibility: "hidden" }}
      />
    </svg>
  );
}
```

### 5. DrawSVGPlugin

- **Purpose**: Animates SVG stroke drawing for hand-drawn effects.
- **Usage**: Great for logos, outlines, or reveals.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

function DrawLine() {
  const svgRef = useRef();
  useGSAP(
    () => {
      gsap.fromTo(
        "#path",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 2, ease: "power2.inOut" }
      );
    },
    { scope: svgRef }
  );

  return (
    <svg ref={svgRef} width="100" height="100">
      <path
        id="path"
        d="M10 50 H 90"
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
```

### 6. Draggable

- **Purpose**: Enables drag-and-drop with inertia.
- **Usage**: Build sliders, carousels, or interactive elements.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

function DraggableSlider() {
  const sliderRef = useRef();
  useGSAP(
    () => {
      Draggable.create(sliderRef.current, {
        type: "x",
        bounds: ".slider-container",
        inertia: true,
        edgeResistance: 0.65,
      });
    },
    { scope: sliderRef }
  );

  return (
    <div className="slider-container">
      <div ref={sliderRef} className="slider">
        <div className="slide">Slide 1</div>
        <div className="slide">Slide 2</div>
        <div className="slide">Slide 3</div>
      </div>
    </div>
  );
}
```

### 7. InertiaPlugin

- **Purpose**: Adds physics-based motion for natural animations.
- **Usage**: Enhances Draggable or creates bounce/throw effects.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
gsap.registerPlugin(InertiaPlugin);

function PhysicsBall() {
  const ballRef = useRef();
  useGSAP(
    () => {
      gsap.to(ballRef.current, {
        x: 200,
        duration: 1,
        ease: "bounce.out",
        inertia: { x: { velocity: 1000, end: [0, 200] } },
      });
    },
    { scope: ballRef }
  );

  return (
    <div ref={ballRef} className="ball">
      Bouncing Ball
    </div>
  );
}
```

### 8. Flip

- **Purpose**: Smoothly animates layout changes (e.g., grid to list).
- **Usage**: Ideal for responsive layouts or dynamic UI.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

function FlipLayout() {
  const containerRef = useRef();
  const toggleLayout = () => {
    const state = Flip.getState(containerRef.current.children);
    containerRef.current.classList.toggle("grid-layout");
    Flip.from(state, { duration: 0.7, ease: "power3.out", absolute: true });
  };

  return (
    <div ref={containerRef} className="container">
      <div className="item">Card 1</div>
      <div className="item">Card 2</div>
      <button onClick={toggleLayout}>Toggle Layout</button>
    </div>
  );
}
```

### 9. MotionPathPlugin

- **Purpose**: Animates elements along a custom SVG path.
- **Usage**: Create complex motion for objects or characters.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

function MotionPath() {
  const itemRef = useRef();
  useGSAP(
    () => {
      gsap.to(itemRef.current, {
        motionPath: {
          path: "#motionPath",
          align: "#motionPath",
          autoRotate: true,
        },
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
      });
    },
    { scope: itemRef }
  );

  return (
    <div>
      <svg width="200" height="100">
        <path
          id="motionPath"
          d="M10 50 Q 100 10 190 50"
          fill="none"
          stroke="gray"
        />
      </svg>
      <div ref={itemRef} className="mover">
        🚀
      </div>
    </div>
  );
}
```

### 10. Physics2DPlugin

- **Purpose**: Simulates 2D physics (gravity, velocity, friction).
- **Usage**: Create realistic falling or projectile effects.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
gsap.registerPlugin(Physics2DPlugin);

function FallingObjects() {
  const containerRef = useRef();
  useGSAP(
    () => {
      gsap.to(".object", {
        physics2D: {
          velocity: 300,
          angle: -90,
          gravity: 500,
        },
        duration: 2,
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="object">🍎</div>
      <div className="object">🍊</div>
      <div className="object">🍋</div>
    </div>
  );
}
```

### 11. CustomEase

- **Purpose**: Creates custom easing curves for unique animations.
- **Usage**: Define bespoke easing for precise control.
- **Example**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

function CustomAnimation() {
  const boxRef = useRef();
  useGSAP(
    () => {
      CustomEase.create("custom", "M0,0 C0.4,0.4 0.6,0.6 1,1");
      gsap.to(boxRef.current, {
        x: 300,
        duration: 1,
        ease: "custom",
      });
    },
    { scope: boxRef }
  );

  return (
    <div ref={boxRef} className="box">
      Custom Ease
    </div>
  );
}
```

## GSAP + React Roadmap (2025)

### Phase 1: GSAP Core Basics (Beginner)

**Goal**: Master GSAP fundamentals for simple animations.

- **Topics**:

  - `gsap.to()`, `gsap.from()`, `gsap.fromTo()`: Animate properties (`x`, `y`, `opacity`, `scale`).
  - Timing: `duration`, `delay`, `ease` (e.g., `power2.out`, `bounce`).
  - Stagger: Animate multiple elements (`stagger: 0.1`).
  - Loops: `repeat`, `yoyo`, `repeatDelay`.
  - `gsap.set()`: Set properties instantly.

- **Practice Projects**:

  - Button Hover: Scale and fade on hover.
  - Card Animation: Staggered fade-in for cards.
  - Rotating Icon: Spin an SVG with `yoyo`.

- **Example**:

```jsx
useGSAP(() => {
  gsap.to(".button", {
    scale: 1.1,
    opacity: 0.9,
    duration: 0.3,
    ease: "power2.out",
    repeat: 1,
    yoyo: true,
  });
});
```

### Phase 2: Timelines & Controls (Intermediate)

**Goal**: Create synchronized animations with timelines.

- **Topics**:

  - `gsap.timeline()`: Chain animations with `.add()`, `.to()`, `.from()`.
  - Labels: Use `tl.add("label")` for precise timing.
  - Controls: `play()`, `pause()`, `reverse()`, `seek()`.
  - Callbacks: `onStart`, `onComplete`, `onUpdate`.

- **Practice Projects**:

  - Hero Sequence: Animate title, subtitle, and CTA.
  - Preloader: Loop a loading animation with callbacks.
  - Progress Bar: Scroll-driven bar with ScrollTrigger.

- **Example**:

```jsx
useGSAP(() => {
  const tl = gsap.timeline({ onComplete: () => console.log("Done!") });
  tl.to(".title", { x: 150, duration: 0.8, ease: "power3.out" })
    .to(".subtitle", { opacity: 1, duration: 0.5 }, "-=0.4")
    .add("cta")
    .to(".button", { scale: 1.2, duration: 0.3 }, "cta");
});
```

### Phase 3: Scroll Animations with ScrollTrigger

**Goal**: Build interactive, scroll-driven animations.

- **Topics**:

  - `ScrollTrigger.create()`: Trigger animations on scroll.
  - Pinning: Lock elements (`pin: true`).
  - Scrubbing: Sync with scroll (`scrub: 0.5`).
  - Responsive: Use `gsap.matchMedia()` for device-specific logic.

- **Practice Projects**:

  - Pinned Section: Pin a hero during scroll.
  - Horizontal Gallery: Scroll horizontally through images.
  - Text Reveal: Fade in text on viewport entry.

- **Example**:

```jsx
useGSAP(() => {
  gsap.matchMedia().add("(min-width: 768px)", () => {
    gsap.to(".box", {
      x: 400,
      scrollTrigger: {
        trigger: ".box",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        pin: true,
      },
    });
  });
});
```

### Phase 4: Advanced Plugins Mastery

**Goal**: Leverage GSAP’s full plugin suite for creative effects.

- **Topics**:

  - ScrollSmoother: Smooth scrolling with `data-speed`, `data-lag`.
  - SplitText: Text animations with `autoSplit`.
  - DrawSVGPlugin: SVG stroke animations.
  - MorphSVGPlugin: Shape morphing.
  - InertiaPlugin: Physics-based motion.
  - Draggable: Interactive sliders/carousels.
  - Flip: Layout transitions.
  - MotionPathPlugin: Path-based animations.
  - Physics2DPlugin: Gravity/velocity effects.
  - CustomEase: Custom easing curves.

- **Practice Projects**:
  - Text Reveal: Staggered word animation with SplitText.
  - Logo Morph: Morph an SVG logo.
  - Parallax Landing: Smooth scrolling with parallax.
  - Interactive Slider: Draggable carousel with inertia.
  - Falling Particles: Physics-based animation.

### Phase 5: Pro-Level GSAP + React Integration

**Goal**: Build production-ready React apps with GSAP.

- **Topics**:

  - `useGSAP` with `gsap.context()` for modular animations.
  - Cleanup: `context.revert()` or `tl.kill()`.
  - Page Transitions: Smooth navigation with React Router.
  - SPA Scroll: ScrollTrigger in single-page apps.
  - Performance: `will-change`, `force3D`, lazy-loading.
  - Accessibility: Respect `prefers-reduced-motion` and ARIA.

- **Practice Projects**:

  - Animated SPA: Route transitions with fades/slides.
  - Reusable Components: Build `FadeIn`, `SlideUp` modules.
  - Scroll Sections: Responsive, scroll-triggered sections.

- **Example (Page Transition)**:

```jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function PageTransition() {
  const navigate = useNavigate();
  const pageRef = useRef();

  const handleNavigate = () => {
    gsap.to(pageRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => navigate("/next-page"),
    });
  };

  useGSAP(
    () => {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="page">
      <h1>Current Page</h1>
      <button onClick={handleNavigate}>Go to Next Page</button>
    </div>
  );
}
```

## Best Practices

- **Cache Selectors**: Use `useRef` or `gsap.context()` to minimize DOM queries.
- **Use Timelines**: Group animations with `gsap.timeline()` for better orchestration.
- **Transforms Over CSS**: Prefer `x`, `y`, `scale` over `top`, `left` for performance.
- **Minimize Callbacks**: Avoid heavy `onUpdate` logic; rely on GSAP’s engine.
- **Clean Up**: Use `ctx.revert()` or `tl.kill()` to prevent memory leaks.
- **Accessibility**:

```jsx
useGSAP(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(".element", { opacity: 1, y: 0 });
  } else {
    gsap.to(".element", { opacity: 1, y: 0, duration: 1 });
  }
});
```

- **Performance**:
  - Use `will-change: transform, opacity` sparingly.
  - Enable `force3D: true` for GPU acceleration.
  - Lazy-load animations with ScrollTrigger’s `onEnter`.

## Final Checklist

- Master GSAP core (`to`, `from`, `timeline`) and easing.
- Create scroll-driven animations with ScrollTrigger (pinning, scrubbing).
- Use all plugins: ScrollSmoother, SplitText, MorphSVG, DrawSVG, Draggable, Flip, MotionPath, Physics2D, CustomEase.
- Build responsive animations with `gsap.matchMedia()`.
- Integrate GSAP with React using `useGSAP` or `useEffect`.
- Create reusable animation components and page transitions.
- Optimize performance (GPU acceleration, lazy-loading) and ensure accessibility.

## Resources

- [GSAP Docs](https://gsap.com/docs/): Core API, plugins, and cheat sheets.
- [GSAP Plugins](https://gsap.com/plugins/): Full plugin details.
- [React + GSAP Guide](https://gsap.com/resources/react/): Official integration guide.
- [CodePen Demos](https://codepen.io/GreenSock/): Interactive examples.
- [GSAP Forums](https://gsap.com/community/): Community Q&A.
- [Webflow GSAP Guide](https://help.webflow.com/hc/en-us/articles/40538857574419): Additional tips.
