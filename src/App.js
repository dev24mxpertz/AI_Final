// import React, { useEffect, useState } from "react";
// import Logo_image from "./assets/Logo_image.png";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const App = () => {
//   const [Loading_Number, setLoading_Number] = useState("00");

//   useEffect(() => {
//     const Loading_window_animation = gsap.timeline({ paused: true });

//     Loading_window_animation.to(".Loading_overlaydiv", {
//       width: "100%",
//       ease: "power2.in",
//       duration: 0.5,
//       opacity: 1,
//       onComplete: () => console.log("Loading overlay animation completed"),
//     })
//       .to(".Loading_container", {
//         height: 0,
//         opacity: 0,
//         duration: 0.5,
//         ease: "power2.out",
//         onComplete: () => {
//           console.log("Loading container animation completed");
//         },
//       })
//       .to(".Hero_page_container", {
//         opacity: 1,
//         width: "100%",
//         height: "101vh",
//         duration: 0.5,
//         onComplete: () => console.log("Hero page animation completed"),
//       })
//       .to(".Loading_overlaydiv", {
//         left: "50%",
//         transform: "translate(50%, -50%)",
//         width: "0%",
//         ease: "power2.out",
//         duration: 0.5,
//         onComplete: () => {
//           console.log("Overlay hidden");
//           Hero_Page_animation.play();
//           gsap.to(".Layout_container", {
//             overflow: "none",
//             height: "101vh",
//             duration: 0.1,
//           });
//         },
//       });

//     const Loading_number_timeline = gsap.timeline({
//       onUpdate: () => {
//         const progress = Math.floor(Loading_number_timeline.progress() * 100);
//         setLoading_Number(progress.toString().padStart(2, "0"));
//       },
//       onComplete: () => {
//         console.log("Loading number completed");
//         Loading_window_animation.play();
//       },
//     });

//     Loading_number_timeline.to({}, { duration: 3 });

//     // ------------------------------------------------------------ hero Page animation timeline

//     const Hero_Page_animation = gsap.timeline({ paused: true });
//     Hero_Page_animation.to(".Hero_page_container_content_box", {
//       width: "50%",
//       opacity: 1,
//       duration: 0.5,
//       ease: "power2.out",
//     }).to(".ModelCanvas_div", {
//       left: "50%",
//       x: "-50%",
//       // y: "-50%",
//       width: "100%",
//       opacity: 1,
//       duration: 0.5,
//       ease: "power2.in",
//       // onUpdate: () => {
//       //   console.log(
//       //     "ModelCanvas_div state:",
//       //     gsap.getProperty(".ModelCanvas_div", "x")
//       //   );
//       // },
//     });
//   }, []);

//   useEffect(() => {
//     // Utility to safely target elements and apply animations
//     const safeAnimate = (animations) => {
//       console.log("SafeAnimate triggered --------------------- " , animations);
//       animations.forEach(({ selector, animationConfig, triggerConfig }) => {
//         const target = document.querySelector(selector);
//         if (target) {
//           gsap.to(target, {
//             ...animationConfig,
//             scrollTrigger: triggerConfig,
//           });
//         } else {
//           console.warn(`Element not found: ${selector}`);
//         }
//       });
//     };

//     // List of animations
//     safeAnimate([
//       {
//         selector: ".Hero_page_container",
//         animationConfig: { opacity: 0, y: 50, duration: 1 },
//         triggerConfig: { trigger: ".ModelCanvas_div", start: "top top" },
//       },
//       {
//         selector: ".Earth_page_container",
//         animationConfig: {
//           opacity: 1,
//           width: "100%",
//           height: "100%",
//           duration: 1,
//         },
//         triggerConfig: { trigger: ".Earth_page_container", start: "top 75%" },
//       },
//     ]);
//   }, []);

//   return (
//     <div className="Layout_container">
//       <div className="Loading_container">
//         <img src={Logo_image} className="image_container" alt="Logo_image" />
//         <div className="Loading_Number_div">{Loading_Number}</div>
//       </div>
//       <div className="Hero_page_container">
//         <div className="Hero_page_container_content_box">
//           <p>
//             Reinvent the value chain, solve unique problems, and boost
//             productivity, efficiency, and profitability with Bespoke AI
//             solutions
//           </p>
//           <div className="Hero_page_container_content_button_box">
//             <button className="Hero_page_container_content_button_box_button">
//               CTA 1
//             </button>
//             <button className="Hero_page_container_content_button_box_button">
//               CTA 1
//             </button>
//           </div>
//         </div>
//         <div className="ModelCanvas_div"></div>
//       </div>
//       <div className="Earth_page_container"></div>
//       <div className="Loading_overlaydiv"></div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import Logo_image from "./assets/Logo_image.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [Loading_Number, setLoading_Number] = useState("00");
  const [animationsCompleted, setAnimationsCompleted] = useState(false);

  useEffect(() => {
    const Loading_window_animation = gsap.timeline({ paused: true });

    Loading_window_animation.to(".Loading_overlaydiv", {
      width: "100%",
      ease: "power2.in",
      duration: 0.5,
      opacity: 1,
      onComplete: () => console.log("Loading overlay animation completed"),
    })
      .to(".Loading_container", {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          console.log("Loading container animation completed");
        },
      })
      .to(".Hero_page_container", {
        opacity: 1,
        width: "100%",
        height: "101vh",
        duration: 0.5,
        onComplete: () => console.log("Hero page animation completed"),
      })
      .to(".Loading_overlaydiv", {
        left: "50%",
        transform: "translate(50%, -50%)",
        width: "0%",
        ease: "power2.out",
        duration: 0.5,
        onComplete: () => {
          console.log("Overlay hidden");
          Hero_Page_animation.play();
          gsap.to(".Layout_container", {
            height: "100vh",
            duration: 0.1,
          });
        },
      });

    const Loading_number_timeline = gsap.timeline({
      onUpdate: () => {
        const progress = Math.floor(Loading_number_timeline.progress() * 100);
        setLoading_Number(progress.toString().padStart(2, "0"));
      },
      onComplete: () => {
        console.log("Loading number completed");
        Loading_window_animation.play();
      },
    });

    Loading_number_timeline.to({}, { duration: 3 });

    // Hero Page Animation Timeline
    const Hero_Page_animation = gsap.timeline({ paused: true });
    Hero_Page_animation.to(".Hero_page_container_content_box", {
      width: "50%",
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(".ModelCanvas_div", {
        left: "50%",
        x: "-50%",
        width: "100%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      })
      .eventCallback("onComplete", () => {
        console.log("Hero page animation completed");
        // setAnimationsCompleted(true);
      });
  }, []);

  // useEffect(() => {
  //   if (animationsCompleted) {
  //     console.log("Initializing safeAnimate after animations completion");

  //     const safeAnimate = (animations) => {
  //       console.log("SafeAnimate triggered --------------------- ", animations);
  //       animations.forEach(({ selector, animationConfig, triggerConfig }) => {
  //         const target = document.querySelector(selector);
  //         if (target) {
  //           gsap.to(target, {
  //             ...animationConfig,
  //             scrollTrigger: triggerConfig,
  //           });
  //         } else {
  //           console.warn(`Element not found: ${selector}`);
  //         }
  //       });
  //     };

  //     safeAnimate([
  //       {
  //         selector: ".Hero_page_container",
  //         animationConfig: { opacity: 0, y: 50, duration: 1 ,  height:0 },
  //         triggerConfig: {
  //           trigger: ".ModelCanvas_div",
  //           start: "top 97%",
  //           markers: true,
  //         },
  //       },
  //       {
  //         selector: ".Earth_page_container",
  //         animationConfig: {
  //           opacity: 1,
  //           width: "100%",
  //           height: "100%",
  //           duration: 1,
  //         },
  //         triggerConfig: { trigger: ".ModelCanvas_div", start: "top 97%" },
  //       },
  //     ]);
  //   }
  // }, [animationsCompleted]);

  return (
    <div className="Layout_container">
      <div className="Loading_container">
        <img src={Logo_image} className="image_container" alt="Logo_image" />
        <div className="Loading_Number_div">{Loading_Number}</div>
      </div>
      <div className="Hero_page_container">
        <div className="Hero_page_container_content_box">
          <p>
            Reinvent the value chain, solve unique problems, and boost
            productivity, efficiency, and profitability with Bespoke AI
            solutions
          </p>
          <div className="Hero_page_container_content_button_box">
            <button className="Hero_page_container_content_button_box_button">
              CTA 1
            </button>
            <button className="Hero_page_container_content_button_box_button">
              CTA 2
            </button>
          </div>
        </div>
        <div className="ModelCanvas_div"></div>
      </div>
      <div className="Loading_overlaydiv"></div>
    </div>
  );
};

export default App;
