import React from "react";
import { LearningButton } from "../Button/Button";
import "./VideoSection.css"

function VideoSection() {
  return (
    <div className="mt-36 mb-36 w-auto">
      <div className="text-center text-5xl">
        <p className="text-white"> We do whatever it takes to help you</p>
        <span className=" text-cyan-400 ">understand the concepts.</span>
        <div className="flex justify-center w-auto h-[480px] mx-auto  mt-11 shadow-emerald-600">
          <iframe
            width="760"
            height="480"
            className=" rounded-lg iframe"
            src="https://www.youtube.com/embed/UwsrzCVZAb8?si=2VoPXLI61IK_ALq8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        {/* <LearningButton/> */}
      </div>

    </div>
  );
}

export default VideoSection;
