import { useEffect, useRef } from 'react';

const VideoPlayer = ({ id, publicId, ...props }) => {
  const videoRef = useRef();
  const cloudinaryRef = useRef();
  const playerRef = useRef();

  // Store the Cloudinary window instance to a ref when the page renders

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = window.cloudinary;

    playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: process.env.REACT_APP_CLOUDINARY_ID,
      secure: true,
      controls: true,
      autoplayMode: 'on-request',
      floatingWhenNotVisible: 'left',
      colors: { "base": "#ffffff", "accent": "#db8226", "text": "#fff" }
    });
  }, []);

  return (
    <div style={{ width: '100%', aspectRatio: `${props.width} / ${props.height}` }}>
      <video
        ref={videoRef}
        id={id}
        className="cld-video-player cld-fluid"
        controls
        data-cld-public-id={`${process.env.REACT_APP_CLOUDINARY_URL}${publicId}`}
        {...props}
      />
    </div>
  );
};

export default VideoPlayer;