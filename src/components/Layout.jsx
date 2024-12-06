// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";

// const Layout = () => {
//   const [LoadingNumber, setLoadingNumber] = useState("00");
//   const [isLoading, setIsLoading] = useState(true);

//   const numberRef = useRef(null);
//   const ModelRef = useRef(null);
//   const BoxRef1 = useRef(null);
//   const BoxRef2 = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline();
//     tl.to(numberRef.current, {
//       left: "0%",
//       duration: 1,
//     })
//       .to(
//         numberRef.current,
//         {
//           opacity: 0,
//           left: "20%",
//           duration: 1,
//         },
//         "-=0.5"
//       )
//       .to(
//         BoxRef1.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//         },
//         "-=1.5"
//       )
//       .to(
//         BoxRef2.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//         },
//         "-=1.5"
//       )
//       .to(
//         BoxRef1.current,
//         {
//           zIndex: 1,
//           left: "33%",
//         },
//         "-=0.5"
//       )
//       .to(
//         BoxRef2.current,
//         {
//           zIndex: 1,
//           left: "39%",
//         },
//         "-=0.5"
//       )
//       .to(
//         numberRef.current,
//         {
//           opacity: 1,
//           duration: 1,
//           ease: "expo.out",
//           onUpdate: () => setLoadingNumber("27"),
//         },
//         "-=0.5"
//       )
//       .to(
//         numberRef.current,
//         {
//           opacity: 0,
//           left: "45%",
//           duration: 1,
//         },
//         "-=0.5"
//       )
//       .to(
//         BoxRef1.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//         },
//         "-=1.5"
//       )
//       .to(
//         BoxRef2.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//         },
//         "-=1.5"
//       )
//       .to(
//         numberRef.current,
//         {
//           opacity: 1,
//           duration: 1,
//           ease: "expo.out",
//           onUpdate: () => setLoadingNumber("47"),
//         },
//         "-=0.5"
//       )
//       .to(
//         BoxRef1.current,
//         {
//           zIndex: 1,
//           left: "58%",
//         },
//         "-=1"
//       )
//       .to(
//         BoxRef2.current,
//         {
//           zIndex: 1,
//           left: "64%",
//         },
//         "-=1"
//       )
//       .to(
//         BoxRef1.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//         },
//         "-=1"
//       )
//       .to(
//         BoxRef2.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//         },
//         "-=1.5"
//       )
//       .to(numberRef.current, {
//         opacity: 0,
//         left: "69%",
//         duration: 1,
//       })
//       .to(
//         numberRef.current,
//         {
//           opacity: 1,
//           duration: 1,
//           ease: "expo.out",
//           onUpdate: () => setLoadingNumber("77"),
//         },
//         "-=0.5"
//       )
//       .to(
//         BoxRef1.current,
//         {
//           zIndex: 1,
//           left: "82%",
//         },
//         "-=1"
//       )
//       .to(
//         BoxRef2.current,
//         {
//           zIndex: 1,
//           left: "88%",
//         },
//         "-=1"
//       )
//       .to(
//         BoxRef1.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//         },
//         "-=1"
//       )
//       .to(
//         BoxRef2.current,
//         {
//           zIndex: 3,
//           duration: 0.5,
//           opacity: 0,
//         },
//         "-=1"
//       )
//       .to(numberRef.current, {
//         opacity: 0,
//         left: "87%",
//         duration: 1,
//       })
//       .to(
//         numberRef.current,
//         {
//           opacity: 1,
//           duration: 1,
//           ease: "expo.out",
//           onUpdate: () => setLoadingNumber("99"),
//         },
//         "-=0.5"
//       )
//       .to(
//         numberRef.current,
//         {
//           opacity: 0,
//           left: "102%",
//           duration: 1,
//           onComplete: () => setIsLoading(false),
//         },
//       );
//   }, []);

//   // useEffect(() => {
//   //   if (!isLoading) {
//   //     gsap.delayedCall(1, () => {
//   //       gsap
//   //         .timeline()
//   //         .to(ModelRef.current, {
//   //           left: "71%",
//   //           top: "71%",
//   //           duration: 2,
//   //         })
//   //         .to(".Hero_content_box", {
//   //           left: "25%",
//   //           opacity: 1,
//   //           duration: 1,
//   //           ease: "expo.out",
//   //         });
//   //     });
//   //   }
//   // }, [isLoading]);

//   function Model({ path }) {
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
//   }

//   return (
//     <>
//       {isLoading ? (
//         <div className="Layout_main_container">
//           <div ref={BoxRef1} className="Layout_Slide_Box1"></div>
//           <div ref={BoxRef2} className="Layout_Slide_Box2"></div>
//           <h1 className="Loader_Number" ref={numberRef}>
//             {LoadingNumber}
//           </h1>
//         </div>
//       ) : (
//         <div className="Layout_main_container">
//           <div className="Main_model_box">
//             <Canvas camera={{ position: [0, 0, 3] }}>
//               <ambientLight intensity={1} />
//               <pointLight position={[5, 5, 5]} intensity={2} />
//               <mesh position={[0, 0, 0]}>
//                 <Model path={glbModel} />
//               </mesh>
//               <OrbitControls />
//             </Canvas>
//           </div>
//           <div className="Hero_content_box">
//             <h1>Reinventing Challenges into Triumphs with Custom AI. </h1>
//             <h3>
//               Reinvent the value chain, solve unique problems, and boost
//               productivity, efficiency, and profitability with Bespoke AI
//               solutions.
//             </h3>
//             <span>
//               <i class="bi bi-arrow-down-circle"></i>
//             </span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Layout;



import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";

const Layout = () => {
  const [LoadingNumber, setLoadingNumber] = useState("00");
  const [isLoading, setIsLoading] = useState(true);

  // Refs
  const numberRef = useRef(null);
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const ModelRef =  useRef(null)

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(numberRef.current, { left: "0%", duration: 1 })
      .to(numberRef.current, { opacity: 0, left: "20%", duration: 1 }, "-=0.5")
      .to(boxRef1.current, { zIndex: 3, duration: 0.5 }, "-=1.5")
      .to(boxRef2.current, { zIndex: 3, duration: 0.5 }, "-=1.5")
      .to(boxRef1.current, { zIndex: 1, left: "33%" }, "-=0.5")
      .to(boxRef2.current, { zIndex: 1, left: "39%" }, "-=0.5")
      .to(
        numberRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          onUpdate: () => setLoadingNumber("27"),
        },
        "-=0.5"
      )
      .to(numberRef.current, { opacity: 0, left: "45%", duration: 1 }, "-=0.5")
      .to(boxRef1.current, { zIndex: 3, duration: 0.5 }, "-=1.5")
      .to(boxRef2.current, { zIndex: 3, duration: 0.5 }, "-=1.5")
      .to(
        numberRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          onUpdate: () => setLoadingNumber("47"),
        },
        "-=0.5"
      )
      .to(boxRef1.current, { zIndex: 1, left: "58%" }, "-=1")
      .to(boxRef2.current, { zIndex: 1, left: "64%" }, "-=1")
      .to(boxRef1.current, { zIndex: 3, duration: 0.5 }, "-=1")
      .to(boxRef2.current, { zIndex: 3, duration: 0.5 }, "-=1.5")
      .to(numberRef.current, { opacity: 0, left: "69%", duration: 1 })
      .to(
        numberRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          onUpdate: () => setLoadingNumber("77"),
        },
        "-=0.5"
      )
      .to(boxRef1.current, { zIndex: 1, left: "82%" }, "-=1")
      .to(boxRef2.current, { zIndex: 1, left: "88%" }, "-=1")
      .to(boxRef1.current, { zIndex: 3, duration: 0.5 }, "-=1")
      .to(boxRef2.current, { zIndex: 3, duration: 0.5, opacity: 0 }, "-=1")
      .to(numberRef.current, { opacity: 0, left: "87%", duration: 1 })
      .to(
        numberRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          onUpdate: () => setLoadingNumber("99"),
        },
        "-=0.5"
      )
      .to(numberRef.current, {
        opacity: 0,
        left: "102%",
        duration: 1,
        onComplete: () => setIsLoading(false),
      });
  }, []);

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

  
  useEffect(() => {
    if (!isLoading) {
      gsap.delayedCall(1, () => {
        gsap
          .timeline()
          .to(ModelRef.current, {
            // right: "2% ",
            top: "71%",
            duration: 2,
          })
          .to(".Hero_content_box", {
            left: "25%",
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          });
      });
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="Layout_main_container">
          <div ref={boxRef1} className="Layout_Slide_Box1"></div>
          <div ref={boxRef2} className="Layout_Slide_Box2"></div>
          <h1 className="Loader_Number" ref={numberRef}>
            {LoadingNumber}
          </h1>
        </div>
      ) : (
        <div className="Layout_main_container2">
          <div ref={ModelRef} className="Main_model_box">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={1} />
              <pointLight position={[5, 5, 5]} intensity={2} />
              <mesh position={[0, 0, 0]}>
                <Model path={glbModel} />
              </mesh>
              <OrbitControls />
            </Canvas>
          </div>
          <div className="Hero_content_box">
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
      )}
    </>
  );
};

export default Layout;
