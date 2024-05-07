import React from "react";
import YouTube from "react-youtube";

const VideoSection = () => {
  return (
    <div className="mt-5 xl:mx-auto xl:max-w-7xl xl:px-8 w-full">
      <div>
        <YouTube
          videoId="nNbG1fsylS0" // YouTube video ID
          className="w-full h-full"
          opts={{
            width: "100%", // Corrected width value
            playerVars: {
              autoplay: 1 // Autoplay the video
            }
          }}
        />
      </div>
    </div>
  );
};

export default VideoSection;
