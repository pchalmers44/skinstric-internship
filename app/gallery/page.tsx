"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef } from "react";

export default function GalleryPage() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showCameraPermission, setShowCameraPermission] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          setIsUploading(true);
          const base64String = reader.result as string;
          setPreviewImage(base64String);
          
          const response = await fetch(
            'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                image: base64String,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('Upload successful:', data);
          
          // Store the analysis data in localStorage
          if (data.data) {
            localStorage.setItem('analysisData', JSON.stringify(data.data));
          }
          
          // Wait 3 seconds before showing success message
          setTimeout(() => {
            alert('Image analyzed successfully!');
            router.push('/select');
          }, 3000);
        } catch (error) {
          console.error('Upload error:', error);
          setTimeout(() => {
            alert('Failed to upload image. Please try again.');
            setIsUploading(false);
          }, 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraPermissionRequest = () => {
    setShowCameraPermission(true);
  };

  const handleAllowCamera = () => {
    router.push('/gallery/camera');
  };

  const handleDenyCamera = () => {
    setShowCameraPermission(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <style>{`
        @media (min-width: 1025px) and (max-width: 1440px) {
          .gallery-nav-text { font-size: 14px !important; }
          .gallery-container { width: 390px !important; height: 390px !important; }
          .gallery-svg-large { width: 224px !important; height: 224px !important; }
          .gallery-svg-medium { width: 192px !important; height: 192px !important; }
          .gallery-svg-small { width: 160px !important; height: 160px !important; }
          .upload-text { font-size: 12px !important; }
          .scan-title-label { width: 210px !important; height: auto !important; right: -100px !important; }
          .gallery-title-label { width: 185px !important; height: auto !important; left: -82px !important; }
        }
        @media (max-width: 1024px) {
          .scan-title-label { width: 180px !important; height: auto !important; right: -72px !important; top: 20px !important; }
          .gallery-title-label { width: 165px !important; height: auto !important; left: -55px !important; bottom: 18px !important; }
        }
        @media (max-width: 768px) {
          .scan-title-label { width: 160px !important; right: -54px !important; top: 38px !important; }
          .gallery-title-label { width: 150px !important; left: -48px !important; bottom: 26px !important; }
        }
        @media (max-width: 480px) {
          .scan-title-label { width: 138px !important; right: -36px !important; top: 35px !important; }
          .gallery-title-label { width: 132px !important; left: -31px !important; bottom: 23px !important; }
          .camera-permission-popup { top: 2% !important; left: 18% !important; right: 0 !important; }
        }
        @media (max-width: 768px) {
          .camera-permission-popup { top: 4% !important; left: 12% !important; right: 40px !important; }
        }
      `}</style>
      {/* Navbar */}
      <nav className="flex justify-between items-start px-4 md:px-8" style={{ height: 'auto', minHeight: '60px', fontSize: '9px', paddingTop: '12px', opacity: showCameraPermission ? 0.3 : 1 }}>
        <div>
          <button
            onClick={() => router.push('/')}
            className="font-bold tracking-wide"
            style={{ fontSize: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            SKINSTRIC<span className="text-gray-600 ml-2">[INTRO]</span>
          </button>
          <div style={{ fontSize: '16px', marginTop: '32px', fontWeight: 600, letterSpacing: '-2%', color: '#1A1B1C', textTransform: 'uppercase' }} className="gallery-nav-text">
            to start analysis
          </div>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition font-semibold" style={{ fontSize: '10px' }}>
          ENTER CODE
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        {isUploading && (
          <>
            <style>{`
              @keyframes dotBlink {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
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
              .dot-1 { animation: dotBlink 1.4s infinite; animation-delay: 0s; }
              .dot-2 { animation: dotBlink 1.4s infinite; animation-delay: 0.2s; }
              .dot-3 { animation: dotBlink 1.4s infinite; animation-delay: 0.4s; }
            `}</style>
            <div className="flex flex-col items-center justify-center">
              {/* Centered Rombuses with overlaid text */}
              <div style={{ position: 'relative', width: '280px', height: '280px' }}>
                {/* First rombus */}
                <svg
                  className="gallery-svg-large"
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
                    top: '50%',
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

                {/* Text centered on rombuses */}
                <h2 style={{ 
                  position: 'absolute',
                  top: '45%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '-2%',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap'
                }}>
                  PREPARING YOUR ANALYSIS..
                </h2>

                {/* Animated dots centered on rombuses */}
                <div style={{
                  position: 'absolute',
                  top: '60%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  gap: '8px',
                  pointerEvents: 'none'
                }}>
                  <span className="dot-1" style={{ fontSize: '24px', fontWeight: 'bold' }}>•</span>
                  <span className="dot-2" style={{ fontSize: '24px', fontWeight: 'bold' }}>•</span>
                  <span className="dot-3" style={{ fontSize: '24px', fontWeight: 'bold' }}>•</span>
                </div>
              </div>
            </div>
          </>
        )}
        {!isUploading && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-24 lg:gap-96 w-full relative">
          {/* Camera Section - Left */}
          <div className="flex flex-col items-center relative">
            {/* Container for rotating diamonds */}
            <div
              className="gallery-container"
              style={{
                width: '482px',
                height: '482px',
                position: 'relative',
              }}
            >
              {/* Camera SVG Image */}
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                <button
                  onClick={handleCameraPermissionRequest}
                  disabled={isUploading}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    opacity: isUploading ? 0.6 : 1,
                  }}
                >
                  <Image
                    src="/camera.svg"
                    alt="Camera"
                    width={136}
                    height={136}
                    style={{
                      width: 'clamp(84px, 9.44vw, 136px)',
                      height: 'clamp(84px, 9.44vw, 136px)',
                      flexShrink: 0,
                    }}
                  />
                </button>
                <Image
                  src="/scan-title.svg"
                  alt="Scan Title"
                  width={239}
                  height={76}
                  className="scan-title-label"
                  style={{
                    position: 'absolute',
                    top: '30px',
                    right: '-125px',
                    width: 'clamp(128px, 16.6vw, 239px)',
                    height: 'auto',
                  }}
                />
              </div>

              {/* Rotating diamonds - rotated rombus shapes */}
              <svg
                className="gallery-svg-large"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '280px',
                  height: '280px',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  opacity: showCameraPermission ? 0.3 : 1,
                  pointerEvents: 'none',
                  animation: 'rotateSlow 70s linear infinite',
                }}
                viewBox="0 0 500 500"
                preserveAspectRatio="none"
              >
                <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
              </svg>

              <svg
                className="gallery-svg-medium"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '240px',
                  height: '240px',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  opacity: showCameraPermission ? 0.18 : 0.6,
                  pointerEvents: 'none',
                  animation: 'rotateMedium 60s linear infinite',
                }}
                viewBox="0 0 500 500"
                preserveAspectRatio="none"
              >
                <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
              </svg>

              <svg
                className="gallery-svg-small"
                style={{
                  position: 'absolute',
                  top: '50%',
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
            </div>


          </div>

          {/* Gallery Section - Right */}
          <div className="flex flex-col items-center relative">
            {/* Container for rotating diamonds */}
            <div
              className="gallery-container"
              style={{
                width: '482px',
                height: '482px',
                position: 'relative',
              }}
            >
              {/* Gallery SVG Image */}
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  opacity: showCameraPermission ? 0.3 : 1,
                }}
              >
                <Image
                  src="/ellipse-93.svg"
                  alt="Gallery"
                  width={126}
                  height={126}
                  style={{
                    width: 'clamp(78px, 8.75vw, 126px)',
                    height: 'clamp(78px, 8.75vw, 126px)',
                  }}
                />
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={isUploading || showCameraPermission}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: (isUploading || showCameraPermission) ? 'not-allowed' : 'pointer',
                    opacity: (isUploading || showCameraPermission) ? 0.3 : 1,
                  }}
                >
                  <Image
                    src="/gallery.svg"
                    alt="Gallery Icon"
                    width={112}
                    height={112}
                    style={{
                      width: 'clamp(70px, 7.78vw, 112px)',
                      height: 'clamp(70px, 7.78vw, 112px)',
                    }}
                  />
                </button>
                <Image
                  src="/title.svg"
                  alt="Title"
                  width={210}
                  height={93}
                  className="gallery-title-label"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '-100px',
                    width: 'clamp(122px, 14.6vw, 210px)',
                    height: 'auto',
                  }}
                />
              </div>

              {/* Rotating diamonds - rotated rombus shapes */}
              <svg
                className="gallery-svg-large"
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

              <svg
                className="gallery-svg-medium"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '240px',
                  height: '240px',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  opacity: showCameraPermission ? 0.18 : 0.6,
                  pointerEvents: 'none',
                  animation: 'rotateMedium 60s linear infinite',
                }}
                viewBox="0 0 500 500"
                preserveAspectRatio="none"
              >
                <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
              </svg>

              <svg
                className="gallery-svg-small"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '200px',
                  height: '200px',          
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  opacity: showCameraPermission ? 0.12 : 0.4,
                  pointerEvents: 'none',
                  animation: 'rotateFast 50s linear infinite',
                }}
                viewBox="0 0 500 500"
                preserveAspectRatio="none"
              >
                <rect x="1" y="1" width="498" height="498" fill="none" stroke="#A0A4AB" strokeWidth="2" strokeDasharray="0.1,8" strokeLinecap="round" />
              </svg>
            </div>


          </div>
        </div>
        )}

        {/* Preview Box - Top Right */}
        <div className="absolute top-16 right-8">
          <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden">
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="imageInput"
          />
        </div>

        <input
          ref={galleryInputRef}
          accept="image/*"
          type="file"
          onChange={handleGalleryUpload}
          className="hidden"
          id="galleryInput"
        />

        <style>{`
          @media (max-width: 1024px) {
            .container-diamonds {
              width: 300px !important;
              height: 300px !important;
            }
            .gallery-text {
              font-size: 12px !important;
            }
          }
          @media (max-width: 768px) {
            .container-diamonds {
              width: 240px !important;
              height: 240px !important;
            }
            .gallery-icon {
              width: 80px !important;
              height: 80px !important;
            }
          }
          @media (max-width: 480px) {
            .container-diamonds {
              width: 180px !important;
              height: 180px !important;
            }
            .gallery-icon {
              width: 60px !important;
              height: 60px !important;
            }
          }
        `}</style>

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <style>{`
          @media (max-width: 1024px) {
            .gallery-container { width: 300px !important; height: 300px !important; }
            .gallery-icon-wrapper { width: 200px !important; height: 200px !important; }
            .gallery-svg-large { width: 200px !important; height: 200px !important; }
            .gallery-svg-medium { width: 172px !important; height: 172px !important; }
            .gallery-svg-small { width: 144px !important; height: 144px !important; }
          }
          @media (max-width: 768px) {
            .gallery-container { width: 240px !important; height: 240px !important; }
            .gallery-icon-wrapper { width: 160px !important; height: 160px !important; }
            .gallery-svg-large { width: 160px !important; height: 160px !important; }
            .gallery-svg-medium { width: 137px !important; height: 137px !important; }
            .gallery-svg-small { width: 114px !important; height: 114px !important; }
          }
          @media (max-width: 480px) {
            .gallery-container { width: 180px !important; height: 180px !important; }
            .gallery-icon-wrapper { width: 120px !important; height: 120px !important; }
            .gallery-svg-large { width: 132px !important; height: 132px !important; }
            .gallery-svg-medium { width: 113px !important; height: 113px !important; }
            .gallery-svg-small { width: 94px !important; height: 94px !important; }
          }
        `}</style>

        {/* Camera Permission Popup */}
        {showCameraPermission && (
          <div className="camera-permission-popup" style={{
            position: 'fixed',
            top: "10%",
            left: 0,
            right: "300px",
            bottom: "0px",
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              cursor: 'pointer',
            }}
            onClick={handleAllowCamera}
            >
              <Image
                src="/float-info.svg"
                alt="Camera Permission"
                width={352}
                height={136}
              />
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/test')}
        className="hover:opacity-70 transition"
        style={{
          position: 'fixed',
          bottom: '32px',
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
