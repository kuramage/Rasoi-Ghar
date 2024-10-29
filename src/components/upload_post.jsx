// import React, { useState } from "react";
import React, { useRef, useState } from "react"; // Ensure useRef is included

import Sidebar from "./sidebar";
import MainContent from "./upload";
import Panel from "./Panel";

const UploadPost = () => {
  const [title, setTitle] = useState("untitled");
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const uploadRef = useRef();
  // const [steps, setSteps] = useState([]);

  const handleStepSelect = (index) => {
    uploadRef.current.handleSelectIndex(index); // Select the entry in Upload
  };
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  // const handleStepSelect = (index) => {
  //   setCurrentStepIndex(index);
  // };

  const addStep = (stepData) => {
    setSteps((prevSteps) => [...prevSteps, stepData]);
    setCurrentStepIndex(steps.length); // Update current step index
  };

  const currentStepData = steps[currentStepIndex] || {};

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        style={{
          width: "82.67vw",
          position: "relative",
          left: "250px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MainContent
          title={title}
          onTitleChange={handleTitleChange}
          onAddStep={addStep}
          currentStepData={currentStepData}
          ref={uploadRef}
        />
        <Panel
          title={title}
          steps={steps}
          currentStepIndex={currentStepIndex} // Pass current index
          onStepSelect={handleStepSelect}
          uploadRef={uploadRef} // Pass function to update index
        />
      </div>
    </div>
  );
};

export default UploadPost;
