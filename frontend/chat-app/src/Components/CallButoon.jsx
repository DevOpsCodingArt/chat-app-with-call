import { VideoIcon } from "lucide-react";
import React from "react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      <button className="btn btn-success btn-sm" onClick={handleVideoCall}>
        <VideoIcon />
      </button>
    </div>
  );
}

export default CallButton;
