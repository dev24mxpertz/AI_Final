import React, { useEffect, useState } from "react";
import Logo_image from "./assets/Logo_image.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loadingNumber, setLoadingNumber] = useState("00");

  useEffect(() => {
    const loadingWindowAnimation = gsap.timeline({
      paused: true,
    });

    loadingWindowAnimation
      .to(".Loading_overlaydiv", {
        width: "100%",
        left:"50%",
        transform: " translate(-50%, -50%)",
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
      .to(".Loading_overlaydiv", {
        left: "50%",
        transform: "translate(50%, -50%)",
        width: "0%",
        ease: "power2.out",
        duration: 0.5,
        onComplete: () => {
          gsap.to(".Layout_container", {
            height: "100vh",
            duration: 0.1,
          });
        },
      });

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
  }, []);

  useEffect(() => {
    const container = document.querySelector(".scroll-section-container");
    const sections = document.querySelectorAll(".scroll-section");
    let currentIndex = 0;
    let isAnimating = false;

    const scrollToSection = (index) => {
      isAnimating = true;
      container.scrollTo({
        left: index * window.innerWidth,
        behavior: "smooth",
      });

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

  return (
    <div className="Layout_container">
      <div className="Loading_container">
        <img src={Logo_image} className="image_container" alt="Logo" />
        <div className="Loading_Number_div">{loadingNumber}</div>
      </div>

      <div className="scroll-section-container">
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
          <div className="content">
            <h1>Section 2</h1>
          </div>
        </div>
        <div className="scroll-section anim">
          <div className="content">
            <h1>Section 3</h1>
          </div>
        </div>
      </div>

      <div className="Loading_overlaydiv"></div>
    </div>
  );
};

export default App;
