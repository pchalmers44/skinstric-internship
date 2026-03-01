"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringTakeTest, setIsHoveringTakeTest] = useState(false);
  const [isHoveringDiscoverAI, setIsHoveringDiscoverAI] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    router.push('/test');
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <style>{`
        @media (min-width: 1025px) and (max-width: 1440px) {
          h1 { font-size: 92px !important; line-height: 86px !important; }
        }
        @media (max-width: 1024px) {
          h1 { font-size: 60px !important; line-height: 56px !important; }
          .main-content { gap: 8px !important; }
          .side-control { width: 120px !important; min-width: 120px !important; }
          .side-diamond { width: 420px !important; height: 420px !important; }
          .left-diamond { left: -300px !important; }
          .right-diamond { right: -300px !important; }
          .side-cta { width: 120px !important; height: 36px !important; }
          .side-cta img { width: 120px !important; height: 36px !important; }
        }
        @media (max-width: 768px) {
          h1 { font-size: 44px !important; line-height: 42px !important; }
          .main-content { gap: 4px !important; }
          .side-control { width: 90px !important; min-width: 90px !important; }
          .side-diamond { width: 300px !important; height: 300px !important; }
          .left-diamond { left: -215px !important; }
          .right-diamond { right: -215px !important; }
          .side-cta { width: 92px !important; height: 30px !important; }
          .side-cta img { width: 92px !important; height: 30px !important; }
          .bottom-text { font-size: 12px !important; line-height: 18px !important; }
        }
        @media (max-width: 480px) {
          h1 { font-size: 34px !important; line-height: 32px !important; }
          .side-control { width: 72px !important; min-width: 72px !important; }
          .side-diamond { width: 230px !important; height: 230px !important; }
          .left-diamond { left: -165px !important; }
          .right-diamond { right: -165px !important; }
          .side-cta { width: 74px !important; height: 24px !important; }
          .side-cta img { width: 74px !important; height: 24px !important; }
          .bottom-text { font-size: 11px !important; line-height: 16px !important; }
        }
      `}</style>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-8" style={{ height: 'auto', minHeight: '54px', fontSize: '10px', paddingTop: '8px', paddingBottom: '8px' }}>
        <div className="font-bold tracking-wide" style={{ fontSize: '10px' }}>
          SKINSTRIC<span className="text-gray-600 ml-2">[INTRO]</span>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition font-semibold" style={{ fontSize: '10px' }}>
          ENTER CODE
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-between px-4 md:px-8 relative main-content">
        {/* Left Arrow */}
        <div className="left-button side-control relative flex items-center justify-center" style={{
          opacity: isHoveringTakeTest ? 0 : 1,
          transition: 'opacity 400ms'
        }}>
          <div
            className="absolute side-diamond left-diamond"
            style={{ 
              width: "602px",
              height: "602px",
              top: "50%",
              left: "-425px",
              border: "2px dashed #A0A4AB",
              transform: "translateY(-50%) rotate(45deg)",
              opacity: 1
            }}
          />
          <button
            onClick={handlePrev}
            onMouseEnter={() => setIsHoveringDiscoverAI(true)}
            onMouseLeave={() => setIsHoveringDiscoverAI(false)}
            className="side-cta hover:opacity-70 transition relative z-10"
            style={{ width: "150px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, background: "none", border: "none", cursor: "pointer", transform: isHoveringDiscoverAI ? "scale(1.2)" : "scale(1)", transition: "transform 300ms" }}
          >
            <Image
              src="/button-icon-text-shrunk.svg"
              alt="Discover AI"
              width={150}
              height={44}
            />
          </button>
        </div>

        {/* Center H1 */}
        <h1 className="text-center flex-1" style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          fontSize: "120px",
          lineHeight: "112px",
          letterSpacing: "-7%",
          textAlign: "center",
          width: "100%",
          maxWidth: "680px",
          height: "auto",
          margin: "0 auto",
          opacity: 1,
          padding: "0 16px"
        }}>
          <span className="transition-all duration-500 inline-block" style={{
            transform: isHoveringTakeTest ? 'translateX(clamp(-380px, -22vw, -70px))' : isHoveringDiscoverAI ? 'translateX(clamp(70px, 22vw, 380px))' : 'translateX(0)',
          }}>
            Sophisticated
          </span>
          <br />
          <span className="transition-all duration-500 inline-block" style={{
            transform: isHoveringTakeTest ? 'translateX(clamp(-460px, -26vw, -90px))' : isHoveringDiscoverAI ? 'translateX(clamp(90px, 26vw, 460px))' : 'translateX(0)',
          }}>
            skincare
          </span>
        </h1>

        {/* Right Button */}
        <div className="right-button side-control relative flex items-center justify-center" style={{
          opacity: isHoveringDiscoverAI ? 0 : 1,
          transition: "opacity 400ms"
        }}>
          <div
            className="absolute side-diamond right-diamond"
            style={{ 
              width: "602px",
              height: "602px",
              top: "50%",
              right: "-425px",
              border: "2px dashed #A0A4AB",
              transform: "translateY(-50%) rotate(45deg)",
              opacity: 1
            }}
          />
          <button
            onClick={handleNext}
            onMouseEnter={() => setIsHoveringTakeTest(true)}
            onMouseLeave={() => setIsHoveringTakeTest(false)}
            className="side-cta hover:opacity-70 transition relative z-10"
            style={{ width: "150px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, background: "none", border: "none", cursor: "pointer", transform: isHoveringTakeTest ? "scale(1.2)" : "scale(1)", transition: "transform 300ms" }}
          >
            <Image
              src="/take-test-button.svg"
              alt="Take Test"
              width={150}
              height={44}
            />
          </button>
        </div>
      </div>

      {/* Bottom Left Text */}
      <p
        className="bottom-text"
        style={{
          position: "fixed",
          width: "auto",
          maxWidth: "316px",
          height: "auto",
          bottom: "16px",
          left: "16px",
          right: "16px",
          opacity: 1,
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "24px",
          letterSpacing: "0%",
          textTransform: "uppercase"
        }}
      >
        Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
      </p>

    </div>
  );
}



