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
            transformOrigin:"center right",
            // height: "5%",
            scaleY :0.5,
            scaleX: 0.5,
            x: 500,  
            opacity: 0,
            duration: 1,
            onComplete: () => {
              setIsViewPage("Page2")
              window.removeEventListener("scroll", onScroll);
              gsap.to(".Page2Container", {
                height:"100%",
                transformOrigin: "center left", // Different origin for upward animation
                scaleY: 1, // Restore original vertical size
                scaleX: 1, // Restore original horizontal size
                x: 0, // Reset position
                opacity: 1, // Fade back in
                duration: 1,
                ease: "power2.out",
              });
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


  useEffect(() => {
    if (!isLoading && isViewPage === "Page2") {
      let previousScrollY = window.scrollY; // Track the previous scroll position
  
      const onScroll = () => {
        const currentScrollY = window.scrollY; // Get the current scroll position
        console.log("Current ScrollY:", currentScrollY, "Previous ScrollY:", previousScrollY);
  
        const page1Timeline = gsap.timeline(); // Create a new GSAP timeline
  
        if (currentScrollY > previousScrollY) {
          // User scrolled down
          // console.log("User scrolled down");
          // page1Timeline.to(".Page1Container", {
          //   transformOrigin: "center right",
          //   scaleY: 0.5,
          //   scaleX: 0.5,
          //   x: 500,
          //   opacity: 0,
          //   duration: 1,
          //   ease: "power2.out",
          //   onComplete: () => {
          //     setIsViewPage("Page3");
          //   },
          // });
        } else if (currentScrollY < previousScrollY) {
          // User scrolled up
          console.log("User scrolled up");
          page1Timeline.to(".Page1Container", {
            transformOrigin: "center left", // Different origin for upward animation
            scaleY: 1, // Restore original vertical size
            scaleX: 1, // Restore original horizontal size
            x: 0, // Reset position
            opacity: 1, // Fade back in
            duration: 1,
            ease: "power2.out",
          });
        }
  
        previousScrollY = currentScrollY; // Update the previous scroll position
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
          <h1 className="LoadingNumber_h1">{loadingNumber}</h1>
        </div>
      ) : (
        <div className="Main_Page_Container">
          {isViewPage === "Page1" ? (
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
          ) : isViewPage === "Page2" ? (
            <div className="Page2Container">
              <h1>Page2</h1>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
  
};

export default Layout;

