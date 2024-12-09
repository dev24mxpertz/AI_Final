// import React, { useEffect, useRef, useState } from "react";
// import LogoImage from "../assets/Logo.png";
// import gsap from "gsap";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";
// const Hero = () => {
//   const [Loading_Number, setLoadingNumber] = useState("00");
//   const [isLoading, setIsLoading] = useState(true);
//   const modelRef  =  useRef(null)

//   useEffect(() => {
//     const tl = gsap.timeline({
//       onUpdate: () => {
//         const current = Math.floor(tl.progress() * 100);
//         setLoadingNumber(current.toString().padStart(2, "0"));
//       },
//       onComplete: () => {
//         gsap.to(".Main_Hero_container", {
//           x: -800,
//           duration: 1,
//           opacity: 0,
//           ease: "expo.out",
//           delay: 1,
//           onComplete: () => {
//             setIsLoading(false);
//           },
//         });
//       },
//     });

//     tl.to({}, { duration: 3, progress: 1 });
//   }, [isLoading]);

//   useEffect(() => {
//     if (!isLoading) {
//       const HeroPagetimeline = gsap.timeline();
//       HeroPagetimeline.to(".Hero_Page_container", {
//         opacity: 1,
//         x: 0,
//       });
//     }
//   }, [isLoading]);


//     const Model = ({ path }) => {
//       const { scene } = useGLTF(path);

//       useEffect(() => {
//         const whiteMaterial = new THREE.MeshStandardMaterial({
//           color: "white",
//           roughness: 0.5,
//         });

//         scene.traverse((child) => {
//           if (child.isMesh) {
//             child.material = whiteMaterial;
//           }
//         });
//       }, [scene]);

//       return <primitive object={scene} />;
//     };


//   return isLoading ? (
//     <>
//       <div className="Main_Hero_container">
//         <img
//           className="Main_Hero_container_image"
//           src={LogoImage}
//           alt="LogoImage"
//         />
//         <h3 className="Loading_Number">{Loading_Number}</h3>
//       </div>
//     </>
//   ) : (
//     <>
//       <div className="Hero_Page_container">
//         <div className="Hero_Page_container_contentbox">
//           <h1 className="Hero_Page_container_h1">
//             TURN Challenges into Triumphs <br /> with Custom AI.{" "}
//           </h1>
//           <p className="Hero_Page_container_p">
//             Reinvent the value chain, solve unique problems, and boost
//             productivity, efficiency, and profitability.
//           </p>
//           <div className="hero_button_container">
//             <button className="hero_button_container_button">CTA 1</button>
//             <button className="hero_button_container_button">CTA 1</button>
//           </div>
//         </div>
//         <div ref={modelRef} className="Model1_container">
//     <Canvas camera={{ position: [0.00, 0.00, 0.00] }}>
//             <ambientLight intensity={1} />
//             <pointLight position={[15, 5, 5]} intensity={2} />
//             <Model path={glbModel} />
//             <OrbitControls />
//           </Canvas>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;

import React, { useEffect, useRef, useState } from "react";
import LogoImage from "../assets/Logo.png";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";

const Hero = () => {
  const [loadingNumber, setLoadingNumber] = useState("00");
  const [isLoading, setIsLoading] = useState(true);
  const [modelPosition, setModelPosition] = useState([0, 0, 0]); // Model's position
  const [relativePosition, setRelativePosition] = useState([0, 0, 0]); // Camera relative to model
  const modelRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onUpdate: () => {
        const current = Math.floor(tl.progress() * 100);
        setLoadingNumber(current.toString().padStart(2, "0"));
      },
      onComplete: () => {
        gsap.to(".Main_Hero_container", {
          x: -800,
          duration: 1,
          opacity: 0,
          ease: "expo.out",
          delay: 1,
          onComplete: () => {
            setIsLoading(false);
          },
        });
      },
    });

    tl.to({}, { duration: 3, progress: 1 });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const heroPageTimeline = gsap.timeline();
      heroPageTimeline.to(".Hero_Page_container", {
        opacity: 1,
        x: 0,
      });
    }
  }, [isLoading]);

  const Model = ({ path, position }) => {
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

    return <primitive ref={modelRef} object={scene} position={position} />;
  };

  const updateRelativeCameraPosition = () => {
    if (controlsRef.current && modelRef.current) {
      const camera = controlsRef.current.object; // Camera object
      const modelWorldPosition = new THREE.Vector3();
      modelRef.current.getWorldPosition(modelWorldPosition); // Get model's world position

      // Calculate relative position of camera to model
      const relativePos = camera.position.clone().sub(modelWorldPosition);
      setRelativePosition([relativePos.x, relativePos.y, relativePos.z]);
    }
  };

  return isLoading ? (
    <div className="Main_Hero_container">
      <img className="Main_Hero_container_image" src={LogoImage} alt="LogoImage" />
      <h3 className="Loading_Number">{loadingNumber}</h3>
    </div>
  ) : (
    <div className="Hero_Page_container">
      <div className="Hero_Page_container_contentbox">
        <h1 className="Hero_Page_container_h1">
          TURN Challenges into Triumphs <br /> with Custom AI.
        </h1>
        <p className="Hero_Page_container_p">
          Reinvent the value chain, solve unique problems, and boost productivity, efficiency, and profitability.
        </p>
        <div className="hero_button_container">
          <button className="hero_button_container_button">CTA 1</button>
          <button className="hero_button_container_button">CTA 2</button>
        </div>
      </div>
      <div className="Model1_container">
        <Canvas camera={{ position: [0.00, 0.00, 0.00] }}>
          <ambientLight intensity={1} />
          <pointLight position={[15, 5, 5]} intensity={2} />
          <Model path={glbModel} position={modelPosition} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            onChange={updateRelativeCameraPosition}
          />
        </Canvas>
        <div style={{position:"absolute" , top:"50%"  , color:"white"}} className="controls">
          <label>Move Model:</label>
          <div>
            <label>
              X:{" "}
              <input
                type="number"
                value={modelPosition[0]}
                onChange={(e) =>
                  setModelPosition([parseFloat(e.target.value), modelPosition[1], modelPosition[2]])
                }
              />
            </label>
            <label>
              Y:{" "}
              <input
                type="number"
                value={modelPosition[1]}
                onChange={(e) =>
                  setModelPosition([modelPosition[0], parseFloat(e.target.value), modelPosition[2]])
                }
              />
            </label>
            <label>
              Z:{" "}
              <input
                type="number"
                value={modelPosition[2]}
                onChange={(e) =>
                  setModelPosition([modelPosition[0], modelPosition[1], parseFloat(e.target.value)])
                }
              />
            </label>
          </div>
        </div>
        <div  style={{position:"absolute" , top:"50%"  , color:"white"}}   className="info">
          <p>
            Model Position: {modelPosition.map((pos) => pos.toFixed(2)).join(", ")}
          </p>
          <p>
            Camera Relative Position to Model:{" "}
            {relativePosition.map((pos) => pos.toFixed(2)).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
