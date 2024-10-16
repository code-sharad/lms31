import React from "react";
import "./HeroComponent.css";
import { ImpButton } from "../Button/Button";

function HeroComponent() {
  const info = {
    title: "Welcome to my website",
    subtitle: "Student taught",
  };
  return (
    <div>
      <div className="seymour-one-regular text-white text-center mt-36 text-6xl">
        <p>
          {" "}
          We only <span className="text-cyan-400">teach</span>
        </p>
        <p>what we are really </p>
        <p> really good at.</p>
      </div>
    
    <div>
      <ImpButton/>
    </div>
      

      <div className="flex justify-center  flex-wrap  gap-56  text-white align-middle mt-28">
        <div className="text-center">
          <p  className="text-3xl font-bold ">24k+</p>
          <span className="text-2xl font-semibold">Student taught</span>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold">9+</p>
          <span className="text-2xl font-semibold">Instructors</span>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold">10+</p>
          <span className="text-2xl font-semibold">Courses</span>
        </div>
      </div>
    </div>
  );
}

export default HeroComponent;
