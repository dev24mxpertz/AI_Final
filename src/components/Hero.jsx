import React, { useEffect, useRef, useState } from "react";
import LogoImage from "../assets/Logo.png";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import glbModel from "../3Dassets/LOGO_GLB_WITH_LINE.glb";
import EarthTexture from "../3Dassets/textures/Material_50_baseColor.jpeg";
import EarthModelpath from "../3Dassets/earth.glb";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [Loading_Number, setLoadingNumber] = useState("00");
  const [isLoading, setIsLoading] = useState(true);
  const modelRef = useRef(null);
  const [isViewPage, setisViewPage] = useState("Page1");
  const [screenwidth, setscreenwidth] = useState(window.innerWidth);

  const Page1ref = useRef(null);

  useEffect(() => {
    const handleResize = () => setscreenwidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const HeroPagetimeline = gsap.timeline();
      HeroPagetimeline.to(".Hero_Page_container", {
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

  const EarthModel = ({ path, position }) => {
    const { scene } = useGLTF(path);

    useEffect(() => {
      if (scene) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(EarthTexture, (texture) => {
          // Apply the texture to the model's material
          scene.traverse((child) => {
            if (child.isMesh) {
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
          });
        });
      }
    }, [scene]);

    return (
      <primitive object={scene} position={position} scale={[0.5, 0.5, 0.5]} />
    );
  };

  useEffect(() => {
    let PageTimeline = gsap.timeline();
    let PreviousScroll = window.scrollY;

    const onScroll = () => {
      console.log("--------------scroll Triggerred Click");
      const currentScroll = window.scrollY;

      console.log(PreviousScroll, "PreviousScroll-*---------");
      console.log(currentScroll, "-----------------currentScroll");

      if (currentScroll > PreviousScroll) {
        console.log("-------------scroll down");
        if (!isLoading) {
          switch (isViewPage) {
            case "Page1":
              console.log("scroll trigger triggered ------------");
              PageTimeline.to(Page1ref.current, {
                scrollTrigger: {
                  trigger: Page1ref.current,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true,
                  // markers: true,
                },
                x: 1000,
                opacity: 0,
                duration: 3,
                onUpdate: () => {
                  setisViewPage("Page2");
                },
                onComplete: () => {
                  console.log("gsap page1 animation completed");
                  gsap.to(".Earth_Page_container", {
                    opacity: 1,
                    transform: "translate3d(0px , 0px ,0px)",
                  });
                },
              });
              break;

            case "Page2":
              // Add logic for Page2
              break;

            default:
              // Optional: handle other cases if needed
              break;
          }
        }
      }
      if (PreviousScroll > currentScroll) {
        console.log("-----------------------scroll up");
        if (!isLoading) {
          switch (isViewPage) {
            case "Page1":
              console.log("scroll trigger triggered ------------");
              PageTimeline.to(".Hero_Page_container", {
                scrollTrigger: {
                  trigger: ".Hero_Page_container",
                  start: "top 1%",
                  end: "bottom bottom",
                  scrub: true,
                  markers: true,
                },
                opacity: 0,
              });

              break;

            case "Page2":
              // Add logic for Page2
              break;

            default:
              // Optional: handle other cases if needed
              break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      console.log("-*--------Removing Event Listeners");
      window.removeEventListener("scroll", onScroll);
    };
  }, [isLoading, isViewPage]);

  return isLoading ? (
    <>
      <div className="Main_Hero_container">
        <img
          className="Main_Hero_container_image"
          src={LogoImage}
          alt="LogoImage"
        />
        <h3 className="Loading_Number">{Loading_Number}</h3>
      </div>
    </>
  ) : isViewPage === "Page1" ? (
    <>
      <div ref={Page1ref} className="Hero_Page_container">
        <div className="Hero_Page_container_contentbox">
          <h1 className="Hero_Page_container_h1">
            TURN Challenges into Triumphs <br /> with Custom AI.
          </h1>
          <p className="Hero_Page_container_p">
            Reinvent the value chain, solve unique problems, and boost
            productivity, efficiency, and profitability.
          </p>
          <div className="hero_button_container">
            <button className="hero_button_container_button">CTA 1</button>
            <button className="hero_button_container_button marginleft">
              CTA 1
            </button>
          </div>
        </div>
        <div ref={modelRef} className="Model1_container">
         {/* <Canvas camera={{ position: [0.0, 0.0, 0.0] }}>
            <ambientLight intensity={1} />
            <pointLight position={[1, 5, 5]} intensity={2} />
            <Model path={glbModel} position={[0, -0.7, -0.4]} />
            <OrbitControls />
          </Canvas> */}
        </div>
      </div>
    </>
  ) : isViewPage === "Page2" ? (
    <div className="Earth_Page_container">
      <div className="Earth_Page_container_content_div">
        <h1 className="Earth_Page_container_content_div_h1">
          REINVENTION WITH GenAI IS THE DEFAULT STRATEGY <br /> FOR SUCCESS
        </h1>
        <h3 className="Earth_Page_container_content_div_h3">
          The rate of change affecting businesses has risen over 183% in the
          <br />
          last 4 years.
        </h3>
        <h3 className="Earth_Page_container_content_div_h3">
          To counter this, 83% of organisations have accelerated the
          <br />
          execution of reinvention with GenAI.
        </h3>
      </div>
      <div className="Earth_Page_modelcontainer">
        <Canvas camera={[0.63, 0.26, 7.25]}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <OrbitControls />
          <EarthModel path={EarthModelpath} position={[0.0, -1.0, 0.5]} />
        </Canvas>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Hero;
