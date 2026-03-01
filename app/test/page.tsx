"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TestPage() {
  const [introduction, setIntroduction] = useState("");
  const [location, setLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const locationRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleIntroductionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && introduction.trim()) {
      e.preventDefault();
      setShowLocation(true);
      setTimeout(() => {
        locationRef.current?.focus();
      }, 0);
    }
  };

  const handleLocationKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && location.trim()) {
      e.preventDefault();
      setIsLoading(true);
      try {
        await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: introduction.trim(),
            location: location.trim(),
          }),
        });
        setTimeout(() => {
          setShowThankYou(true);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        // Handle error silently but still show thank you
        setTimeout(() => {
          setShowThankYou(true);
          setIsLoading(false);
        }, 4000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <style>{`
        textarea::placeholder {
          color: #1A1B1C;
          opacity: 1;
        }
        @keyframes rotateSlow {
          0% { transform: translate(-50%, -50%) rotate(45deg); }
          100% { transform: translate(-50%, -50%) rotate(405deg); }
        }
        @keyframes rotateMedium {
          0% { transform: translate(-50%, -50%) rotate(45deg); }
          100% { transform: translate(-50%, -50%) rotate(405deg); }
        }
        @keyframes rotateFast {
          0% { transform: translate(-50%, -50%) rotate(45deg); }
          100% { transform: translate(-50%, -50%) rotate(405deg); }
        }
        @media (max-width: 768px) {
          .test-svg-large { width: 300px !important; height: 300px !important; }
          .test-svg-medium { width: 250px !important; height: 250px !important; }
          .test-svg-small { width: 200px !important; height: 200px !important; }
          .test-textarea { font-size: 14px !important; }
          .test-location-input { width: 220px !important; }
        }
        @media (max-width: 480px) {
          .test-svg-large { width: 200px !important; height: 200px !important; }
          .test-svg-medium { width: 160px !important; height: 160px !important; }
          .test-svg-small { width: 120px !important; height: 120px !important; }
          .test-textarea { font-size: 12px !important; }
          .test-location-input { width: 190px !important; }
        }
      `}</style>
      {/* Navbar */}
      <nav className="flex justify-between items-start px-8" style={{ height: '90px', fontSize: '10px', paddingTop: '17px' }}>
        <div>
          <button
            onClick={() => router.push('/')}
            className="font-bold tracking-wide"
            style={{ fontSize: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            SKINSTRIC<span className="text-gray-600 ml-2">[INTRO]</span>
          </button>
          <div style={{ fontSize: '16px', marginTop: '32px', fontWeight: 600, letterSpacing: '-2%', color: '#1A1B1C', textTransform: 'uppercase' }}>
            to start analysis
          </div>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition font-semibold" style={{ fontSize: '10px' }}>
          ENTER CODE
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        {/* SVG Diamond Border - anchored to main content center */}
        <svg
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'clamp(200px, 34.72vw, 500px)',
            height: 'clamp(200px, 34.72vw, 500px)',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            opacity: 1,
            pointerEvents: 'none',
            zIndex: 1,
            animation: 'rotateSlow 70s linear infinite',
            overflow: 'visible',
          }}
          viewBox="0 0 500 500"
          preserveAspectRatio="none"
        >
          <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
        </svg>
        <svg
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'clamp(200px, 34.72vw, 500px)',
            height: 'clamp(200px, 34.72vw, 500px)',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 1,
            animation: 'rotateMedium 60s linear infinite',
            overflow: 'visible',
          }}
          viewBox="0 0 500 500"
          preserveAspectRatio="none"
        >
          <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
        </svg>
        <svg
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'clamp(200px, 34.72vw, 500px)',
            height: 'clamp(200px, 34.72vw, 500px)',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 1,
            animation: 'rotateFast 50s linear infinite',
            overflow: 'visible',
          }}
          viewBox="0 0 500 500"
          preserveAspectRatio="none"
        >
          <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col items-center relative" style={{ marginTop: 'clamp(24px, 3.33vw, 48px)' }}>
          {!showLocation && (
            <>
              <p 
                className="text-sm mb-2 uppercase whitespace-nowrap relative z-10" 
                style={{ 
                fontSize: 'clamp(10px, 0.97vw, 14px)',
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                lineHeight: 'clamp(16px, 1.67vw, 24px)',
                letterSpacing: '0%',
                width: 'clamp(70px, 6.67vw, 96px)',
                height: 'clamp(16px, 1.67vw, 24px)',
                opacity: 0.4,
                marginTop: 'clamp(-100px, -6.94vw, -48px)'
                }}
              >
                click to type
              </p>
              <textarea
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                onKeyDown={handleIntroductionKeyDown}
                placeholder="Introduce Yourself"
                className="p-0 border-b-2 border-black focus:outline-none resize-none relative z-10 placeholder-gray-900"
                rows={1}
                style={{ 
                  fontSize: 'clamp(24px, 4.17vw, 60px)',
                  color: '#1A1B1C',
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  lineHeight: 'clamp(28px, 4.44vw, 64px)',
                  letterSpacing: '-7%',
                  width: 'clamp(220px, 29.17vw, 420px)',
                  background: 'transparent',
                  overflow: 'hidden',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  textAlign: 'center',
                  borderBottomWidth: 'clamp(1px, 0.14vw, 2px)',
                }}
              />
            </>
          )}
          
          {showLocation && (
            <div className="flex flex-col items-center relative z-10">
              {!showThankYou && (
                <>
                  {!isLoading && (
                    <p 
                      className="text-sm mb-2 uppercase" 
                      style={{ 
                      fontSize: 'clamp(10px, 0.97vw, 12px)',
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      lineHeight: 'clamp(16px, 1.67vw, 24px)',
                      letterSpacing: '0%',
                      opacity: 0.4,
                      marginTop: 'clamp(-100px, -6.94vw, -48px)'
                      }}
                    >
                      where are you from?
                    </p>
                  )}
                  {isLoading ? (
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: 'clamp(-100px, -6.94vw, -48px)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 'clamp(14px, 1.67vw, 20px)',
                          color: '#1A1B1C',
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 400,
                          lineHeight: 'clamp(18px, 1.67vw, 24px)',
                          letterSpacing: '0%',
                          marginTop: '20px',
                        }}
                      >
                        processing submission
                      </div>
                      <div
                        style={{
                          fontSize: 'clamp(14px, 1.67vw, 20px)',
                          color: '#1A1B1C',
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 400,    
                          lineHeight: 'clamp(18px, 1.67vw, 24px)',
                          letterSpacing: '8px',
                          marginTop: '20px',
                        }}
                        className="animate-pulse"
                      >
                        •••
                      </div>
                    </div>
                  ) : (
                    <textarea
                      ref={locationRef}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyDown={handleLocationKeyDown}
                      placeholder="Where are you from?"
                      className="test-location-input p-0 border-b-2 border-black focus:outline-none resize-none"
                      rows={1}
                      style={{ 
                        fontSize: 'clamp(20px, 3.33vw, 48px)',
                        color: '#1A1B1C',
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        lineHeight: 'clamp(24px, 3.61vw, 52px)',
                        letterSpacing: '-7%',
                        width: 'clamp(260px, 31vw, 460px)',
                        background: 'transparent',
                        overflow: 'visible',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        textAlign: 'center',
                        borderBottomWidth: 'clamp(1px, 0.14vw, 2px)',
                      }}
                    />
                  )}
                </>
              )}
              {showThankYou && (
                <div className="flex flex-col items-center" style={{ marginTop: 'clamp(-100px, -6.94vw, -48px)' }}>
                  <p
                    style={{
                      fontSize: 'clamp(14px, 1.39vw, 20px)',
                      color: '#1A1B1C',
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      lineHeight: 'clamp(18px, 1.67vw, 24px)',
                      letterSpacing: '0%',
                      textAlign: 'center',
                      marginBottom: '40px',
                    }}
                  >
                    Thank you!
                  </p>
                  <p
                    style={{
                      fontSize: 'clamp(14px, 1.39vw, 20px)',
                      color: '#1A1B1C',
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      lineHeight: 'clamp(18px, 1.67vw, 24px)',
                      opacity: 0.4,
                    }}
                  >
                    proceed for the next step
                  </p>
                  <button
                    onClick={() => router.push('/gallery')}
                    className="hover:opacity-70 transition"
                    style={{
                      position: 'fixed',
                      bottom: '32px',
                      right: '32px',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      zIndex: 50,
                    }}
                  >
                    <Image
                      src="/proceed-button.svg"
                      alt="Proceed"
                      width={97}
                      height={44}
                    />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="hover:opacity-70 transition"
        style={{
          position: 'absolute',
          width: '97px',
          height: '44px',
          top: '1200px',
          left: '32px',
          opacity: 1,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer'
        }}
      >
        <Image
          src="/back-button.svg"
          alt="Back"
          width={97}
          height={44}
        />
      </button>
    </div>
  );
}
