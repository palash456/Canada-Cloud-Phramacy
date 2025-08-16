"use client";

import React, { useRef } from "react";

const styles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/80",
  container: "flex flex-col items-center justify-center w-full h-full",
  video: "w-full h-full object-cover",
  closeBtn: "absolute top-4 right-4 bg-white text-black rounded-full px-4 py-2 font-bold shadow-lg z-50",
};


export const FullScreenCamera = ({ onCapture, onClose }: { onCapture: (file: File) => void; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLoading(false);
      } catch {
        setError("Unable to access camera. Please check permissions and try again.");
        setLoading(false);
      }
    })();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [onClose]);

  const handleCapture = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], "scan.jpg", { type: "image/jpeg" });
          onCapture(file);
          onClose();
        }
      }, "image/jpeg");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {loading && (
          <div style={{ color: '#fff', fontSize: 20, marginBottom: 20 }}>Loading camera...</div>
        )}
        {error && (
          <div style={{ color: 'red', fontSize: 18, marginBottom: 20 }}>{error}</div>
        )}
        {!loading && !error && (
          <>
            <video ref={videoRef} autoPlay playsInline className={styles.video} />
            <button className={styles.closeBtn} onClick={onClose}>Close</button>
            <button className={styles.closeBtn} style={{ top: 60 }} onClick={handleCapture}>Capture</button>
          </>
        )}
        {error && (
          <button className={styles.closeBtn} onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
};

export default FullScreenCamera;
