"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CameraSetupPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/gallery/camera/capture');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
      <style>{`
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
      `}</style>

      <style>{`
        @media (max-width: 768px) {
          .camera-diamonds-container {
            width: 300px !important;
            height: 300px !important;
          }
          .camera-icon {
            width: 100px !important;
            height: 100px !important;
          }
        }
        @media (max-width: 480px) {
          .camera-diamonds-container {
            width: 220px !important;
            height: 220px !important;
          }
          .camera-icon {
            width: 80px !important;
            height: 80px !important;
          }
        }
      `}</style>
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
        <div className="camera-diamonds-container" style={{ position: 'relative', width: '400px', height: '400px', overflow: 'visible' }}>
          {/* Camera Icon */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}>
            <Image
              src="/camera.svg"
              alt="Camera"
              width={136}
              height={136}
              className="camera-icon"
              style={{ width: "136px", height: "136px" }}
            />
          </div>

          {/* First rombus */}
          <svg
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '280px',
              height: '280px',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              opacity: 1,
              pointerEvents: 'none',
              animation: 'rotateSlow 70s linear infinite',
            }}
            viewBox="0 0 500 500"
            preserveAspectRatio="none"
          >
            <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
          </svg>

          {/* Second rombus */}
          <svg
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '240px',
              height: '240px',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              opacity: 0.6,
              pointerEvents: 'none',
              animation: 'rotateMedium 60s linear infinite',
            }}
            viewBox="0 0 500 500"
            preserveAspectRatio="none"
          >
            <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
          </svg>

          {/* Third rombus */}
          <svg
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              width: '200px',
              height: '200px',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              opacity: 0.4,
              pointerEvents: 'none',
              animation: 'rotateFast 50s linear infinite',
            }}
            viewBox="0 0 500 500"
            preserveAspectRatio="none"
          >
            <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
          </svg>

          {/* Loading Text */}
          <h2 style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '-2%',
            color: '#1A1B1C',
            margin: 0,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            SETTING UP CAMERA ...
          </h2>
        </div>

        {/* Additional Tips Text */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#1A1B1C',
          margin: '0 0 16px 0',
          letterSpacing: '0%',
          textTransform: 'uppercase',
        }}>
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>

        {/* Tips with Diamonds */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}>
          {/* Neutral Expression */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src="/rectangle2681.svg"
              alt="Diamond"
              width={12}
              height={12}
              style={{ flexShrink: 0 }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#1A1B1C',
              letterSpacing: '0%',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              NEUTRAL EXPRESSION
            </span>
          </div>

          {/* Frontal Pose */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src="/rectangle2681.svg"
              alt="Diamond"
              width={12}
              height={12}
              style={{ flexShrink: 0 }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#1A1B1C',
              letterSpacing: '0%',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              FRONTAL POSE
            </span>
          </div>

          {/* Adequate Lighting */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src="/rectangle2681.svg"
              alt="Diamond"
              width={12}
              height={12}
              style={{ flexShrink: 0 }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#1A1B1C',
              letterSpacing: '0%',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              ADEQUATE LIGHTING
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
