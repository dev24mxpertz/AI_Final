// import React, { useEffect, useState, useRef } from "react";
// import { gsap } from "gsap";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Layout = () => {
//   const [loadingNumber, setLoadingNumber] = useState("00");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isViewPage, setisViewPage] = useState("Page1");
//   const modelRef = useRef();
//   const Page1ContentRef = useRef();

//   useEffect(() => {
//     const tl = gsap.timeline({
//       onUpdate: () => {
//         const current = Math.floor(tl.progress() * 100);
//         setLoadingNumber(current.toString().padStart(2, "0"));
//       },
//       onComplete: () => {
//         gsap.to(".LoadingNumber_h1", {
//           opacity: 0,
//           duration: 1,
//           ease: "expo.out",
//           delay: 1,
//           onComplete: () => setIsLoading(false),
//         });
//       },
//     });

//     tl.to({}, { duration: 3, progress: 1 });
//   }, []);

//   useEffect(() => {
//     if (!isLoading) {
//       gsap.delayedCall(2, () => {
//         gsap
//           .timeline()
//           .to(modelRef.current, {
//             left: "73%",
//             top: "71%",
//             ease: "expo.out",
//             duration: 2,
//           })
//           .to(
//             Page1ContentRef.current,
//             { x: 20, ease: "expo.out", duration: 2 } // Starting properties
//           );
//       });
//     }
//   }, [isLoading]);

//   useEffect(() => {
//     if (!isLoading && isViewPage === "Page1") {
//       const page1timeline = gsap.timeline();
//       console.log("complier setup in the structure correctly")
//       page1timeline.to(".Page1Container", {
//         x: 1000,
//         height: "20%",
//         opacity: 0,
//         duration: 2,
//       });
//     }
//   }, []);

//   const Model = ({ path }) => {
//     const { scene } = useGLTF(path);

//     useEffect(() => {
//       const whiteMaterial = new THREE.MeshStandardMaterial({
//         color: "white",
//         roughness: 0.5,
//       });

//       scene.traverse((child) => {
//         if (child.isMesh) {
//           child.material = whiteMaterial;
//         }
//       });
//     }, [scene]);

//     return <primitive object={scene} />;
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <div className="LoaderLayout">
//           <h1 className="LoadingNumber_h1">{loadingNumber}%</h1>
//         </div>
//       ) : (
//         <div className="Main_Page_Container">
//           <div className="Page1Container">
//             <div ref={modelRef} className="Model1_container">
//               <Canvas camera={{ position: [0, 0, 3] }}>
//                 <ambientLight intensity={1} />
//                 <pointLight position={[5, 5, 5]} intensity={2} />
//                 <Model path={glbModel} />
//                 <OrbitControls />
//               </Canvas>
//             </div>
//             <div ref={Page1ContentRef} className="Page1_content_container">
//               <h1>Reinventing Challenges into Triumphs with Custom AI.</h1>
//               <h3>
//                 Reinvent the value chain, solve unique problems, and boost
//                 productivity, efficiency, and profitability with Bespoke AI
//                 solutions.
//               </h3>
//               <span>
//                 <i className="bi bi-arrow-down-circle"></i>

//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Layout;

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const [loadingNumber, setLoadingNumber] = useState("00");
  const [isLoading, setIsLoading] = useState(true);
  const [isViewPage, setIsViewPage] = useState("Page1");
  const modelRef = useRef();
  const page1ContentRef = useRef();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(screenWidth, "******screenwidth");

  //Code For Update Screen width on window resize

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      onUpdate: () => {
        const current = Math.floor(tl.progress() * 100);
        setLoadingNumber(current.toString().padStart(2, "0"));
      },
      onComplete: () => {
        gsap.to(".LoadingNumber_h1", {
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          delay: 1,
          onComplete: () => setIsLoading(false),
        });
      },
    });

    tl.to({}, { duration: 3, progress: 1 });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (screenWidth < 600) {
        gsap.delayedCall(2, () => {
          gsap
            .timeline()
            .to(modelRef.current, {
              left: "50%",
              top: "75%",
              ease: "expo.out",
              duration: 2,
            })
            .to(page1ContentRef.current, {
              x: 0,
              ease: "expo.out",
              duration: 2,
            });
        });
      } else if (screenWidth > 1024) {
        gsap.delayedCall(2, () => {
          gsap
            .timeline()
            .to(modelRef.current, {
              left: "73%",
              top: "71%",
              ease: "expo.out",
              duration: 2,
            })
            .to(page1ContentRef.current, {
              x: 20,
              ease: "expo.out",
              duration: 2,
            });
        });
      }
    }
  }, [isLoading]);

  // useEffect(() => {
  //   if (!isLoading && isViewPage === "Page1") {
  //     let previousScrollY = window.scrollY;

  //     const onScroll = () => {
  //       console.log("-------------- on Scroll triggereed --------");
  //       const currentScrollY = window.scrollY;
  //       console.log(
  //         currentScrollY,
  //         "-------------------------- currentScrollY -----------",
  //         previousScrollY,
  //         " ----------previousScrollY ----"
  //       );
  //       if (currentScrollY > previousScrollY) {
  //         const page1Timeline = gsap.timeline();
  //         page1Timeline.to(".Page1Container", {
  //           x: 1000,
  //           height: "20%",
  //           opacity: 0,
  //           duration: 2,
  //           onComplete: () => {
  //             window.removeEventListener("scroll", onScroll);
  //           },
  //         });
  //       }
  //       previousScrollY = currentScrollY;
  //     };
  //     window.addEventListener("scroll", onScroll);
  //     return () => {
  //         console.log("Removing scroll listener");
  //       window.removeEventListener("scroll", onScroll);
  //     };
  //   }
  // }, [isLoading, isViewPage]);

  useEffect(() => {
    if (!isLoading && isViewPage === "Page1") {
      let previousScrollY = window.scrollY;

      const onScroll = () => {
        console.log("Scroll event triggered");
        const currentScrollY = window.scrollY;
        console.log(
          "Current ScrollY:",
          currentScrollY,
          "Previous ScrollY:",
          previousScrollY
        );

        if (currentScrollY > previousScrollY) {
          console.log("User scrolled down");

          const page1Timeline = gsap.timeline();
          page1Timeline.to(".Page1Container", {
            x: 1000,
            height: "20%",
            opacity: 0,
            duration: 2,
            onComplete: () => {
              window.removeEventListener("scroll", onScroll);
            },
          });
        }

        previousScrollY = currentScrollY;
      };

      console.log("Adding scroll listener");

      window.addEventListener("scroll", onScroll);

      return () => {
        console.log("Removing scroll listener");
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [isLoading, isViewPage]);

  const Model = ({ path }) => {
    const { scene } = useGLTF(path);

    useEffect(() => {
      const whiteMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        roughness: 0.5,
      });

      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = whiteMaterial;
        }
      });
    }, [scene]);

    return <primitive object={scene} />;
  };

  return (
    <div>
      {isLoading ? (
        <div className="LoaderLayout">
          <h1 className="LoadingNumber_h1">{loadingNumber}%</h1>
        </div>
      ) : (
        <div className="Main_Page_Container">
          <div className="Page1Container">
            <div ref={modelRef} className="Model1_container">
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={1} />
                <pointLight position={[5, 5, 5]} intensity={2} />
                <Model path={glbModel} />
                <OrbitControls />
              </Canvas>
            </div>
            <div ref={page1ContentRef} className="Page1_content_container">
              <h1>Reinventing Challenges into Triumphs with Custom AI.</h1>
              <h3>
                Reinvent the value chain, solve unique problems, and boost
                productivity, efficiency, and profitability with Bespoke AI
                solutions.
              </h3>
              <span>
                <i className="bi bi-arrow-down-circle"></i>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
