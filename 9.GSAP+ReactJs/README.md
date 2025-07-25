## Project Setup (**GSAP** and React v19)

### 1. Prerequisites

- Node.js (v16.8+; preferably latest LTS or above)
- npm or yarn

---

### 2. Create a React Project with Vite (recommended)

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

---

### 3. Install GSAP (v3.13.0+)

```bash
npm install gsap
```

Or include via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/gsap.min.js"></script>
```

This includes all core modules and optional plugins ([npm][3]).

---

## Project Structure & Dependencies

```
/src
  App.jsx
  components/
     Hero.jsx
     AnimatedList.jsx
package.json
```

Dependencies:

```json
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "gsap": "^3.13.0"
}
```

React 19 introduced powerful new hooks (useActionState, useFormStatus, useOptimistic), server‑components, improved hydration, etc. ([Wikipedia][4]).

---

## ✨ Using GSAP in React

### With `@gsap/react` hook (Recommended)

```bash
npm install @gsap/react
```

In your component:

```jsx
import React from "react";
import { useGSAP } from "@gsap/react";

function Hero() {
  const { ref, gsap } = useGSAP();

  React.useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [gsap]);

  return <div ref={ref}>Welcome to GSAP + React!</div>;
}
```

This simplifies boilerplate; GSAP handles cleanup automatically ([npm][3]).

### Without `useGSAP`: manual setup

```jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function AnimatedList() {
  const listRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(listRef.current.children, {
      y: 20,
      opacity: 1,
      stagger: 0.2,
      duration: 0.5,
    });
    return () => tl.kill();
  }, []);

  return (
    <ul ref={listRef}>
      <li style={{ opacity: 0 }}>Item 1</li>
      <li style={{ opacity: 0 }}>Item 2</li>
    </ul>
  );
}
```

---

## 🔌 Adding Plugins (ScrollTrigger, Flip, Draggable...)

```js
import { gsap } from "gsap";
import { ScrollTrigger, Flip, Draggable, MotionPathPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Flip, Draggable, MotionPathPlugin);
```

Use ScrollTrigger for scroll-based animations; Flip for layout transitions; MotionPathPlugin for path-based animation ([npm][3]).

---

## 📘 GSAP Best Practices

- Cache DOM references before animation
- Favor timeline grouping over many independent tweens
- Use transform props (`x`, `y`) instead of CSS layout
- Avoid heavy `onUpdate` callbacks—you can often let GSAP manage updates
- Kill unused tweens to avoid memory leaks ([Technical Manuals][5])

---

## 📖 React & GSAP Learning Roadmap

1. Explore **react.dev**: includes tutorials, code samples, challenges, and guides for modern React using functional components and hooks. Considered among the best beginner-friendly docs ([Reddit][6]).
2. GSAP documentation (gsap.com, green­sock GitHub) provides core API reference, plugin guides, demos, and a cheat‑sheet ([GitHub][7]).
3. Community forums and Reddit: real‑world tips and troubleshooting (e.g., Vite vs CRA, plugin integrations) ([Reddit][8], [Reddit][1], [Reddit][9]).

---

## ✅ Summary Table

| Stage              | Tool / Setup                              | Purpose                                     |
| ------------------ | ----------------------------------------- | ------------------------------------------- |
| Starter            | `npm create vite --template react`        | Bootstraps minimal React using Vite         |
| GSAP Core          | `npm install gsap`                        | Animations: core library + utility methods  |
| React Hook Setup   | `@gsap/react` → `useGSAP()`               | Simplifies setup/cleanup in React           |
| Plugins            | `gsap.registerPlugin(...)`                | ScrollTrigger, Flip, MotionPath etc.        |
| Manual Approach    | `useRef`, `useEffect` + `gsap.timeline()` | More control, compatible if no hook desired |
| Learning Resources | react.dev + gsap.com docs + forums        | Tutorials, API references, real‑world Q\&A  |

---

## Best Practices

- Timeline over individual tweens
- Kill unused animations
- Cache selectors
- Avoid overuse of onUpdate callbacks

## Learning

- Official React documentation: react.dev
- GSAP docs and demos: gsap.com
- Community forums and Reddit for real-world integration tips
