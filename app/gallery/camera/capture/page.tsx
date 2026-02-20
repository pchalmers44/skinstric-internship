"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CameraCapturePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    // Only start camera if not in photo taken state
    if (!photoTaken) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Failed to access camera:', error);
          alert('Unable to access camera.');
          router.push('/gallery');
        }
      };

      startCamera();
    }

    return () => {
      if (!photoTaken) {
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, [router, photoTaken]);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      setIsUploading(true);
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        
        // Store preview image
        setPreviewImage(imageData);

        // Stop the camera stream
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());

        // Upload the image
        const response = await fetch(
          'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: imageData,
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

        // Show great shot and proceed button
        setPhotoTaken(true);
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setTimeout(() => {
        alert('Failed to upload image. Please try again.');
        setIsUploading(false);
      }, 3000);
    }
  };

  const handleRetake = () => {
    setPhotoTaken(false);
    setPreviewImage(null);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <style>{`
        @media (min-width: 1025px) and (max-width: 1440px) {
          .great-shot-text { top: 200px !important; }
        }
        @media (max-width: 768px) {
          .take-picture-button { width: 60px !important; height: 60px !important; }
          .take-picture-text { display: none !important; }
          .bottom-button { width: 70px !important; height: 32px !important; bottom: 16px !important; }
          .tips-section { padding: 0 12px !important; gap: 16px !important; }
          .tips-item { font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          .take-picture-button { width: 50px !important; height: 50px !important; }
          .bottom-button { width: 60px !important; height: 28px !important; bottom: 12px !important; }
          .tips-section { gap: 12px !important; padding: 0 8px !important; }
          .tips-item { font-size: 11px !important; }
        }
        .bottom-button {
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .bottom-button:hover {
          transform: scale(1.1);
        }
        .back-button-hover:hover {
          filter: brightness(1.2);
        }
      `}</style>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Navbar */}
      <nav className="flex justify-between items-start px-4 md:px-8" style={{ 
        height: 'auto', 
        minHeight: '60px', 
        fontSize: '9px', 
        paddingTop: '12px',
        position: 'relative',
        zIndex: 50,
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent)',
      }}>
        <div>
          <button
            onClick={() => {
              const stream = videoRef.current?.srcObject as MediaStream;
              stream?.getTracks().forEach(track => track.stop());
              router.push('/gallery');
            }}
            className="font-bold tracking-wide"
            style={{ fontSize: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
          >
            SKINSTRIC<span className="text-gray-400 ml-2">[{photoTaken ? 'ANALYSIS' : 'CAMERA'}]</span>
          </button>
        </div>
      </nav>

      {/* Great Shot Message - After Photo is Taken */}
      {photoTaken && (
        <div className="great-shot-text" style={{
          position: 'fixed',
          top: '300px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
        }}>
          <h1 style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#FCFCFC',
            margin: 0,
            letterSpacing: '-1%',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          }}>
            GREAT SHOT!
          </h1>
        </div>
      )}

      {/* Preview Image - After Photo is Taken */}
      {photoTaken && previewImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          overflow: 'hidden',
        }}>
          <img 
            src={previewImage} 
            alt="Captured Photo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* TAKE PICTURE Button - Right Side Middle */}
      {!photoTaken && (
        <div style={{
          position: 'fixed',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 100,
        }}>
        <span style={{
          color: 'white',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '-1%',
          textTransform: 'uppercase',
          display: 'none',
        }}
        className="hidden md:block"
        >
          TAKE PICTURE
        </span>
        <button
          onClick={handleCapture}
          disabled={isUploading}
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isUploading ? 0.6 : 1,
            flexShrink: 0,
          }}
        >
          <Image
            src="/take-picture.svg"
            alt="Take Picture"
            width={80}
            height={80}
          />
        </button>
      </div>
      )}

      {/* Back to Camera Button - Bottom Left (After Photo Taken) */}
      {photoTaken && (
        <button
          onClick={handleRetake}
          className="hover:opacity-70 transition bottom-button back-button-hover"
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '32px',
            opacity: 1,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            zIndex: 100,
            width: '75px',
            height: '35px',
          }}
        >
          <Image
            src="/back-button-white.svg"
            alt="Retake"
            width={97}
            height={44}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </button>
      )}

      {/* Proceed to Results Button - Bottom Right (After Photo Taken) */}
      {photoTaken && (
        <button
          onClick={() => {
            router.push('/select');
          }}
          className="hover:opacity-70 transition bottom-button"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            zIndex: 100,
            width: '97px',
            height: '44px',
          }}
        >
          <Image
            src="/proceed-white.svg"
            alt="Proceed"
            width={97}
            height={44}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </button>
      )}

      {/* Tips Section - Bottom Middle */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 50,
      }}>
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#FCFCFC',
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
              style={{ flexShrink: 0, filter: 'brightness(0) invert(1)' }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#FCFCFC',
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
              style={{ flexShrink: 0, filter: 'brightness(0) invert(1)' }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#FCFCFC',
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
              style={{ flexShrink: 0, filter: 'brightness(0) invert(1)' }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#FCFCFC',
              letterSpacing: '0%',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              ADEQUATE LIGHTING
            </span>
          </div>
        </div>
      </div>

      {/* Back Button - Bottom Left (Before Photo Taken) */}
      {!photoTaken && (
        <button
          onClick={() => {
            const stream = videoRef.current?.srcObject as MediaStream;
            stream?.getTracks().forEach(track => track.stop());
            router.push('/gallery');
          }}
          disabled={isUploading}
          className="hover:opacity-70 transition bottom-button back-button-hover"
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '32px',
            opacity: isUploading ? 0.6 : 1,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: isUploading ? 'not-allowed' : 'pointer',
            zIndex: 100,
            width: '97px',
            height: '44px',
          }}
        >
          <Image
            src="/back-button-white.svg"
            alt="Back"
            width={97}
            height={44}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </button>
      )}
    </div>
  );
}
