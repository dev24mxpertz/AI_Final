// import React, { useEffect, useState, useRef } from "react";
// import { gsap } from "gsap";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const Layout = () => {
//   const [loadingNumber, setLoadingNumber] = useState("00");
//   const [isLoading, setIsLoading] = useState(true);

//   const ModelRef = useRef();

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
//           onComplete: () => {
//             setIsLoading(false);
//           },
//         });
//       },
//     });

//     tl.to({}, { duration: 3, progress: 1 });
//   }, []);

//   useEffect(() => {
//     if (!isLoading) {
//       gsap.delayedCall(1, () => {
//         gsap.timeline().to(ModelRef.current, {
//           left: "71%",
//           top: "71%",
//           ease: "expo.out",
//           duration: 2,
//         });
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
//           <div ref={ModelRef} className="Model1_container">
//             <Canvas camera={{ position: [0, 0, 3] }}>
//               <ambientLight intensity={1} />
//               <pointLight position={[5, 5, 5]} intensity={2} />
//               <mesh position={[0, 0, 0]}>
//                 <Model path={glbModel} />
//               </mesh>
//               <OrbitControls />
//             </Canvas>
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

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const [loadingNumber, setLoadingNumber] = useState("00");
  const [isLoading, setIsLoading] = useState(true);
  const modelRef = useRef();
  const Page1ContentRef =  useRef()

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
    gsap.delayedCall(2, () => {
      gsap
        .timeline()
        .to(modelRef.current, {
          left: "73%",
          top: "71%",
          ease: "expo.out",
          duration: 2,
        })
        .to(
          Page1ContentRef.current,
          { x: 20  ,  ease: "expo.out", duration: 2}, // Starting properties
        );
    });
  }
}, [isLoading]);

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
          <div ref={modelRef} className="Model1_container">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={1} />
              <pointLight position={[5, 5, 5]} intensity={2} />
              <Model path={glbModel} />
              <OrbitControls />
            </Canvas>
          </div>
          <div ref={Page1ContentRef} className="Page1_content_container">
            <h1>Reinventing Challenges into Triumphs with Custom AI.</h1>
            <h3>
              Reinvent the value chain, solve unique problems, and boost
              productivity, efficiency, and profitability with Bespoke AI
              solutions.{" "}
            </h3>
            <span>
              <i className="bi bi-arrow-down-circle"></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
