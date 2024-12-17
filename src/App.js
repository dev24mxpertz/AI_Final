import React, { useEffect, useRef, useState } from "react";
import Logo_image from "./assets/Logo_image.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import glbModel from "./3Dassets/INFINITY.glb";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loadingNumber, setLoadingNumber] = useState("00");
  const modelRef = useRef(null);

useEffect(() => {
  const loadingWindowAnimation = gsap.timeline({ paused: true });

  loadingWindowAnimation
    .to(".Loading_overlaydiv", {
      width: "100%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: 1,
      ease: "power2.in",
      duration: 0.5,
    })
    .to(".Loading_container", {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(".scroll-section-container", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(
      ".Loading_overlaydiv",
      {
        left: "100%",
        transform: "translate(50%, -50%)",
        width: "0%",
        opacity: 0,
        ease: "power2.out",
        duration: 0.5,
        onComplete: () => {
          sectionsAnimation();
        },
      },
      "-=0.5"
    );

  const loadingNumberTimeline = gsap.timeline({
    onUpdate: () => {
      const progress = Math.floor(loadingNumberTimeline.progress() * 100);
      setLoadingNumber(progress.toString().padStart(2, "0"));
    },
    onComplete: () => {
      loadingWindowAnimation.play();
    },
  });

  loadingNumberTimeline.to({}, { duration: 3 });

  // Scroll Animations for Sections
  const sectionsAnimation = () => {
    const sections = document.querySelectorAll(".scroll-section");

    sections.forEach((section, index) => {
      const content = section.querySelector(
        ".section1content, .section2content"
      );

      if (!content) {
        console.warn(`No animatable content found in section ${index}`);
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none none",
          },
        })
        .fromTo(
          content,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );
    });
  };

  const container = document.querySelector(".scroll-section-container");
  const sections = document.querySelectorAll(".scroll-section");
  let currentIndex = 0;
  let isAnimating = false;

  const updateModelTransform = (index) => {
    const currentTranslateX = -50 + index * 100; // Calculate the new translate percentage
    gsap.to(".Model1_container", {
      opacity: 1,
      transform: `translate(${currentTranslateX}%, -50%)`,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        sectionsAnimation();
      },
    });
  };

  const scrollToSection = (index) => {
    isAnimating = true;
    container.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth",
    });

    updateModelTransform(index);

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  };

  const onScroll = (e) => {
    if (isAnimating) return;
    e.preventDefault();
    if (e.deltaY > 0 && currentIndex < sections.length - 1) {
      currentIndex++;
      scrollToSection(currentIndex);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      scrollToSection(currentIndex);
    }
  };

  container.addEventListener("wheel", onScroll);

  return () => {
    container.removeEventListener("wheel", onScroll);
  };
}, []);


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

  return (
    <div className="Layout_container">
      <div className="Loading_container">
        <img src={Logo_image} className="image_container" alt="Logo" />
        <div className="Loading_Number_div">{loadingNumber}</div>
      </div>
      <div className="scroll-section-container">
        <div className="Model1_container">
          <Canvas camera={{ position: [-0.014622406, -3.5403, -0.0213045] }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Model path={glbModel} position={[2, 0, 0]} />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="scroll-section anim">
          <div className="section1content">
            <h1>Reinvent </h1>
            <h3>VALUE CHAIN</h3>
            <p>
              Solve unique problems boost productivity, efficiency, and
              <br />
              profitability with Bespoke AI solutions.
            </p>
            <div className="section1content_buttoncontainer">
              <button className="section1content_buttoncontainer_button">
                CTA 1
              </button>
              <button className="section1content_buttoncontainer_button">
                CTA 2
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-section anim">
          <div className="section2content">
            <h1>
              REINVENTION <br /> WITH GenAI
            </h1>
            <h3>
              IS THE DEFAULT <br /> STRATEGY FOR SUCCESS
            </h3>
            <p>
              The rate of change affecting businesses has risen over 183% in the
              last 4 years. <br />
              To counter this, 83% of organisations have accelerated the
              execution of reinvention with GenAI.
            </p>
          </div>
        </div>
        <div className="scroll-section anim">
          <div className="section3content">
            <h1>More than twice the revenue</h1>
            <h3>in less than half the time against competitors</h3>
            <div className="section3content_headingbox">
              <h3>Greater improvements in productivity </h3>
              <h3>Higher average revenue growth </h3>
            </div>
            <div className="section3content_headingbox">
              <p>
                3M HOURS <br /> SAVED
                <br />
                An agency saved 3 million operational <br />
                hours using GenAI
              </p>
              <p>
                3M HOURS <br />
                SAVED <br />A company delivered 16 million <br />
                personalised offerings to their customers within 3 months.
              </p>
              <p>
                3M HOURS <br />
                SAVED <br />
                An insurer increased the potential <br />
                revenue by 10% using AI in only one single <br />
                function of the whole process
              </p>
            </div>
          </div>
        </div>
        <div className="scroll-section anim">
          <div className="section4content">
            <h2>OUR SUITE OF SERVICES</h2>
            <div className="section4content_container">
              <div className="section4content_box">
                <h3>A. AI ASSISTANT FOR CUSTOMER SERVICE</h3>
                <p>
                  Eliminate unique customer frustrations and operational issues
                  to deliver a seamless experience that keeps them coming back,
                  all while driving greater operational efficiency and
                  productivity with the custom AI assistant for customer
                  service.
                </p>
                <button>LEARN MORE</button>
              </div>
              <div className="section4content_box">
                <h3>B. AI WORKFORCE FOR BUSINESS OPERATIONS </h3>
                <p>
                  Imagine a workplace where challenges are met head-on,
                  departments thrive, and employees are empowered to focus on
                  creativity and innovation—all driven by custom AI solutions
                  applicable throughout the value chain, designed to solve your
                  unique business problems and inefficiencies.
                </p>
                <button>LEARN MORE</button>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-section anim">
          <div className="section5content">
            <h2>
              ACHIEVE YOUR VISION AND MISSION with ALTUS INTELLIGENT SOLUTIONS{" "}
            </h2>
            <div className="section5content_container">
              <div className="section5content_box">
                <h3>BOOST YOUR SUCCESS</h3>
                <p>
                  Our goal is to help you eliminate obstacles and unlock your
                  full potential.
                </p>
                <p>
                  Our intelligent solutions target unique challenges, enhance
                  customer experiences, and fuel innovation, setting you apart
                  in a competitive landscape.
                </p>
              </div>
              <div className="section5content_box">
                <h3>MAX RESULTS, LOW OVERHEAD</h3>
                <p>Achieve more without heavy costs!</p>
                <p>
                  By optimising processes, we help you achieve peak performance
                  while keeping operational expenses in check.
                </p>
              </div>
              <div className="section5content_box">
                <h3>EMPOWERED HUMAN CAPITAL</h3>
                <p>Empower your team to do their best work.</p>
                <p>
                  Ease frustrations, mitigate risks, and handle routine tasks,
                  enabling your employees to focus on creativity, innovation,
                  and high-value work—leading to a more engaged, productive, and
                  motivated workforce.
                </p>
              </div>
              <div className="section5content_box">
                <h3>ADAPTIVE SCALABILITY</h3>
                <p>AI Tools that grow with you.</p>
                <p>
                  We proactively ensure that your solutions meet new demands so
                  as you grow, your processes and systems remain
                  optimised—enabling confident and sustainable scaling.
                </p>
              </div>
              <div className="section5content_box">
                <h3>BE A DIFFERENTIATOR</h3>
                <p>Stand out from the crowd.</p>
                <p>
                  Our customised solutions enable you to offer distinctive
                  capabilities that set you apart from competitors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-section anim">
          <div className="section6content">
            <h2>Partner with us to achieve your vision and mission </h2>
            <div className="section6content_container">
              <div className="section6content_box">
                <h3>BESPOKE SOLUTIONS</h3>
                <h4>We solve your unique problems </h4>
                <p>
                  We collaborate closely with you to design and deliver
                  customised solutions, ensuring that our AI tools are
                  fine-tuned to address your unique business problems and
                  requirements.
                </p>
              </div>
              <div className="section6content_box">
                <h3>PARTNERSHIP FOR LASTING IMPACT </h3>
                <h4>Your success is our priority, now and in the future.</h4>
                <p>
                  We provide regular updates, ongoing support, and continuous
                  optimisation to ensure your unique challenges are always
                  addressed, and our AI solutions continue delivering value as
                  your business grows.
                </p>
              </div>
              <div className="section6content_box">
                <h3>SEAMLESS INTEGRATION</h3>
                <h4>Resolve business problems smoothly and effortlessly.</h4>
                <p>
                  Our solutions are designed to work harmoniously with your
                  existing systems, minimising disruption and ensuring a quick
                  and efficient transition.
                </p>
              </div>
              <div className="section6content_box">
                <h3>EXPERTISE</h3>
                <h4>
                  Years of experience, young creative minds, and passion for
                  problem-solving and innovation.
                </h4>
                <p>
                  With deep industry knowledge, a flare of creativity,
                  experience, and a commitment to innovation, we don’t just
                  offer technology—we partner and consult with you to unlock
                  your business’s full potential by concisely identifying
                  challenges, discerning room for improvements, and
                  comprehending your unique requirements to develop superior
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Loading_overlaydiv"></div>
    </div>
  );
};

export default App;

// import React, { useEffect, useRef, useState } from "react";
// import Logo_image from "./assets/Logo_image.png";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import glbModel from "./3Dassets/INFINITY.glb";

// gsap.registerPlugin(ScrollTrigger);

// const App = () => {
//   const [loadingNumber, setLoadingNumber] = useState("00");
//   const modelRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [cameraPosition, setCameraPosition] = useState([-0.014622406, -3.5403, -0.0213045]);
//   const [modelPosition, setModelPosition] = useState([2, 0, 0]);

//   useEffect(() => {
//     const loadingWindowAnimation = gsap.timeline({
//       paused: true,
//     });

//     loadingWindowAnimation
//       .to(".Loading_overlaydiv", {
//         width: "100%",
//         left: "50%",
//         transform: " translate(-50%, -50%)",
//         opacity: 1,
//         ease: "power2.in",
//         duration: 0.5,
//       })
//       .to(".Loading_container", {
//         height: 0,
//         opacity: 0,
//         duration: 0.5,
//         ease: "power2.out",
//       })
//       .to(".scroll-section-container", {
//         opacity: 1,
//         duration: 0.5,
//         ease: "power2.out",
//       })
//       .to(
//         ".Loading_overlaydiv",
//         {
//           left: "100%",
//           transform: "translate(50%, -50%)",
//           width: "0%",
//           opacity: 0,
//           ease: "power2.out",
//           duration: 0.5,
//           onComplete: () => {
//             gsap.to(".Layout_container", {
//               height: "100vh",
//               duration: 0.1,
//             });
//           },
//         },
//         "-=0.5"
//       );

//     const loadingNumberTimeline = gsap.timeline({
//       onUpdate: () => {
//         const progress = Math.floor(loadingNumberTimeline.progress() * 100);
//         setLoadingNumber(progress.toString().padStart(2, "0"));
//       },
//       onComplete: () => {
//         loadingWindowAnimation.play();
//       },
//     });

//     loadingNumberTimeline.to({}, { duration: 3 });
//   }, []);

//   useEffect(() => {
//     const container = document.querySelector(".scroll-section-container");
//     const sections = document.querySelectorAll(".scroll-section");
//     let currentIndex = 0;
//     let isAnimating = false;

//     const scrollToSection = (index) => {
//       isAnimating = true;
//       container.scrollTo({
//         left: index * window.innerWidth,
//         behavior: "smooth",
//       });

//       setTimeout(() => {
//         isAnimating = false;
//       }, 600);
//     };

//     const onScroll = (e) => {
//       if (isAnimating) return;
//       e.preventDefault();
//       if (e.deltaY > 0 && currentIndex < sections.length - 1) {
//         currentIndex++;
//         scrollToSection(currentIndex);
//       } else if (e.deltaY < 0 && currentIndex > 0) {
//         currentIndex--;
//         scrollToSection(currentIndex);
//       }
//     };

//     container.addEventListener("wheel", onScroll);

//     return () => {
//       container.removeEventListener("wheel", onScroll);
//     };
//   }, []);

//   // Model Component
//   const Model = ({ path, position }) => {
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

//     useFrame(() => {
//       if (modelRef.current) {
//         modelRef.current.position.x = position[0] + mousePosition.x * 0.5;
//         modelRef.current.position.y = position[1] + mousePosition.y * 0.5;
//         setModelPosition([modelRef.current.position.x, modelRef.current.position.y, modelRef.current.position.z]); // Update model position
//       }
//     });

//     return <primitive ref={modelRef} object={scene} position={position} />;
//   };

//   return (
//     <div className="Layout_container">
//       <div className="Loading_container">
//         <img src={Logo_image} className="image_container" alt="Logo" />
//         <div className="Loading_Number_div">{loadingNumber}</div>
//       </div>
//       <div className="scroll-section-container">
//         <div className="scroll-section anim">
//           <div className="section1content">
//             <h1>Reinvent </h1>
//             <h3>VALUE CHAIN</h3>
//             <p>
//               Solve unique problems boost productivity, efficiency, and
//               <br />
//               profitability with Bespoke AI solutions.
//             </p>
//             <div className="section1content_buttoncontainer">
//               <button className="section1content_buttoncontainer_button">
//                 CTA 1
//               </button>
//               <button className="section1content_buttoncontainer_button">
//                 CTA 2
//               </button>
//             </div>
//           </div>
//           <div className="Model1_container">
//             <Canvas camera={{ position: cameraPosition }}>
//               <ambientLight intensity={1} />
//               <pointLight position={[10, 10, 10]} intensity={2} />
//               <Model path={glbModel} position={[2, 0, 0]} />
//               <OrbitControls
//                 onChange={(e) => setCameraPosition(e.target.object.position.toArray())}
//               />
//             </Canvas>
//           </div>
//           <div className="position-info">
//             <h3>Camera Position: {cameraPosition.join(", ")}</h3>
//             <h3>Model Position: {modelPosition.join(", ")}</h3>
//           </div>
//         </div>
//       </div>
//       <div className="Loading_overlaydiv"></div>
//     </div>
//   );
// };

// export default App;
