import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP); //^ Registers the useGSAP hook for React integration with automatic cleanup.

const Timeline2 = () => {
  const tlRef = useRef(); //^ timeline ref created

  const tweenRef = useRef();

  useGSAP(() => {
    //$1 way- single control without timeline Independent
    tweenRef.current = gsap.to(".box", {
      x: 1000,
      duration: 3,
      rotate: 360,
      delay: 1,
      paused: true, // initially paused
    });

    //$2 way- with timeline + control
    const tl = gsap.timeline({ paused: true }); // timeline initialize and pause whole timeline at beginning

    tlRef.current = tl; //^ store timeline in tlRef, as ref(value) for control

    // tl.add(tweenRef.current); //$ if we want add 1 way element in timeline  but then initially paused remove of that elm

    tl.to(".box1", {
      x: 500,
      duration: 4,
      rotation: "1.25rad", //moves + rotates
    });

    tl.to(
      ".box2",
      {
        xPercent: 50, //xPercent shift
        duration: 1,
        repeat: Infinity,
        yoyo: true,
      },
      "-=1" //@ so 1 sec phle run kar jayega last timeline wale element k end hone se phle
    )

      //^2 way chaining method (here we don't need to use tl already connected with last tl)
      .to(
        ".box3",
        {
          x: 500,
          repeat: -1, // infinite loop
          duration: 1,
          autoAlpha: 0, //autoAlpha (end time disappear)
        },
        "+=2" //@ so last timeline end hone k 2 sec. baad run hoga
      )

      .to(
        ".box4",
        {
          yPercent: 50, //yPercent shift
          skewX: 30, //skew x axis
          duration: 1,
        },
        "animTogether"
      ) //@ here we define any name - "animTogether" where define those animation run together

      .from(
        ".box5",
        {
          xPercent: 50, //comes in with skew from right
          skewY: 30,
          duration: 2,
        },
        "animTogether"
      ) //@ here we define any name - "animTogether" where define those animation run together

      .fromTo(
        ".box6", //moves from center to bottom-right
        {
          // initial position
          top: "50%",
          left: "50%",
        },
        {
          // final position
          top: "80%",
          left: "90%",
          borderRadius: "50%",
          duration: 2,
          ease: "power3.out", //smoothness
        },
        "animTogether+=2" //@ so last timeline end hone k 2 sec. baad run hoga
      );
  });

  return (
    <>
      {/* Timeline + control */}
      <div style={{ width: "100%", height: "100vh" }}>
        <h1>Timeline In React</h1>

        <div style={{ backgroundColor: "red", width: "100px" }} className="box">
          Box (Not attached timeline only control apply using vairable not
          useRef)
        </div>
        <div
          style={{ backgroundColor: "red", width: "100px" }}
          className="box1"
        >
          Box 1
        </div>
        <div
          style={{ backgroundColor: "green", width: "100px" }}
          className="box2"
        >
          Box 2
        </div>
        <div
          style={{ backgroundColor: "blue", width: "100px", height: "100px" }}
          className="box3"
        >
          Box 3
        </div>
        <div
          style={{ backgroundColor: "white", width: "100px", height: "100px" }}
          className="box4"
        >
          Box 4
        </div>
        <div
          style={{ backgroundColor: "cyan", width: "100px", height: "100px" }}
          className="box5"
        >
          Box 5
        </div>
        <div
          style={{
            backgroundColor: "orange",
            width: "100px",
            height: "100px",
            position: "absolute", // Required for 'top' and 'left' to work
          }}
          className="box6"
        >
          Box 6
        </div>

        {/* Control methods */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            margin: "2rem",
          }}
        >
          <button onClick={() => tweenRef.current?.play()}>
            play() with normal variable
          </button>

          <button id="play" onClick={() => tlRef.current?.play()}>
            play() with useRef
          </button>
          <button id="pause" onClick={() => tlRef.current?.pause()}>
            pause()
          </button>
          <button id="resume" onClick={() => tlRef.current?.resume()}>
            resume()
          </button>
          <button id="reverse" onClick={() => tlRef.current?.reverse()}>
            reverse()
          </button>
          <button id="restart" onClick={() => tlRef.current?.restart()}>
            restart()
          </button>
        </div>
      </div>

      {/* all Control apply */}
      <TimelineControlExample />
    </>
  );
};

export default Timeline2;

import { useState } from "react";

export const TimelineControlExample = () => {
  const tlRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isKilled, setIsKilled] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(".box", {
      x: 1000,
      rotation: 360,
      duration: 10,
    });

    tlRef.current = tl;
  }, []);

  const handleKill = () => {
    tlRef.current?.kill();
    setIsKilled(true);
  };

  const handleRestart = () => {
    if (tlRef.current && !isKilled) {
      tlRef.current.restart();
      setProgress(0);
      setTime(0);
      setDuration(0);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>GSAP Timeline Control (On Button Click Only)</h2>

      <div
        className="box"
        style={{
          width: 100,
          height: 100,
          backgroundColor: "skyblue",
          marginBottom: 20,
        }}
      >
        Box
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Progress:</strong> {(progress * 100).toFixed(1)}% &nbsp;|&nbsp;
        <strong>Time:</strong> {time.toFixed(2)}s &nbsp;|&nbsp;
        <strong>Duration:</strong> {duration.toFixed(2)}s
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button onClick={() => tlRef.current?.play()} disabled={isKilled}>
          ▶ play()
        </button>

        <button onClick={() => tlRef.current?.pause()} disabled={isKilled}>
          ⏸ pause()
        </button>

        <button onClick={() => tlRef.current?.resume()} disabled={isKilled}>
          🔄 resume()
        </button>

        <button onClick={() => tlRef.current?.reverse()} disabled={isKilled}>
          ↩ reverse()
        </button>

        <button onClick={handleRestart} disabled={isKilled}>
          🔁 restart()
        </button>

        <button
          onClick={() => {
            tlRef.current?.progress(0.5);
            setProgress(tlRef.current?.progress());
          }}
          disabled={isKilled}
        >
          ⏩ progress(0.5)
        </button>

        <button
          onClick={() => setProgress(tlRef.current?.progress())}
          disabled={isKilled}
        >
          📊 show progress()
        </button>

        <button
          onClick={() => {
            tlRef.current?.seek(2);
            setTime(tlRef.current?.time());
          }}
          disabled={isKilled}
        >
          ⏭ seek(2s)
        </button>

        <button
          onClick={() => setTime(tlRef.current?.time())}
          disabled={isKilled}
        >
          ⏱ show time()
        </button>

        <button
          onClick={() => setDuration(tlRef.current?.duration())}
          disabled={isKilled}
        >
          📏 show duration()
        </button>

        <button onClick={() => tlRef.current?.timeScale(2)} disabled={isKilled}>
          ⚡ timeScale 2x
        </button>

        <button
          onClick={() => tlRef.current?.timeScale(0.5)}
          disabled={isKilled}
        >
          🐢 timeScale 0.5x
        </button>

        <button onClick={handleKill} disabled={isKilled}>
          💀 kill()
        </button>
      </div>
    </div>
  );
};

//$ Explanation of All Methods
// play() → Current position se timeline play karega
// pause(time?, suppressEvents?) → Timeline ko stop karega. time pass kiya to uss time pe jump hoke pause hoga
// resume() → pause ke baad wapas play karega (same as play if already started)
// reverse() → Timeline reverse direction mein chalega (end → start)
// restart() → Timeline 0 second se dobara chalega
// progress(val) → 0 to 1 range ka value set karta hai, 0 = start, 1 = end
// progress() → Returns current progress (0 to 1)
// seek(time) → Timeline ke kisi exact time (in seconds) pe le jaata hai
// time() → Return Current playhead time in seconds
// duration() → Return Total duration of timeline
// timeScale(val) → Speed control, 1 = normal, 2 = double, 0.5 = slow
// kill() → Completely removes the timeline instance and disables reuse
