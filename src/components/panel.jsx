import React, { useState } from "react";
import PropTypes from 'prop-types';

function panel({ title, onStepSelect, uploadRef }) {
  const [steps, setSteps] = useState([1]);

  const handleAddStep = () => {
    const newStep = {
      title: `Step ${steps.length + 1}`,
    };

    // Save the current data in the Upload component when a new step is added
    if (uploadRef.current) {
      uploadRef.current.handleAddStep(); // Ensure this method exists in the Upload component
    }

    setSteps((prevSteps) => [...prevSteps, newStep]);
  };

  const onStepClick = (step) => {
    if (uploadRef.current) {
      uploadRef.current.handleSelectIndex(step); // Ensure this method exists in the Upload component
    }
  };
  
  return (
    <div className="w-1/5 p-5 flex flex-col items-start space-y-4" style={{ background: "#E6CDA4" }}>
      <h2 className="font-bold">Steps:</h2>
      
      <div style={{ position: "relative", width: "100%" }}>
        {steps.map((step, index) => (
          <div
            key={index}
            className="steps jetbrains-mono text-3xl font-bold mb-6"
            style={{
              background: "black",
              color: "white",
              width: "252px",
              minHeight: "50px",
              padding: "10px",
              overflowWrap: "break-word",
              position: "relative",
              marginLeft: "-20px",
              fontWeight: "1",
              fontSize: "20px",
              marginBottom: "3px",
              cursor: "pointer",
            }}
            onClick={() => onStepClick(index)}
          >
            { "Untitled"}
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                background: "#E6CDA4",
                color: "black",
                borderRadius: "5px 5px 0px 0px",
                padding: "5px 10px",
                width: "10px",
                height: "28px",
                fontSize: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      <button
        className="jetbrains-mono bg-white border px-4 py-1 rounded-lg"
        style={{
          width: "185px",
          height: "49px",
          display: "flex",
          fontSize: "25px",
          border: "1px solid",
          borderRadius: "16px",
          filter: "drop-shadow(0 3px 2px rgba(0, 0, 0, 0.3))",
        }}
        onClick={handleAddStep}
      >
        Add Step +
      </button>
    </div>
  );
}

panel.propTypes = {
  onStepSelect: PropTypes.func.isRequired,
  uploadRef: PropTypes.shape({
    current: PropTypes.shape({
      handleSaveData: PropTypes.func,
    }),
  }),
};

panel.defaultProps = {
  onStepSelect: () => {}, // Set to a no-op function if not provided
  uploadRef: { current: null }, // Default for uploadRef
};

export default panel;



// import React from 'react';

// function Panel(props) {
//   return (
//     <div className="w-1/5 p-5 flex flex-col items-start space-y-4" style={{ background: "#E6CDA4" }}>
//       <h2 className="font-bold">Steps:</h2>

//       {/* Map through steps to render each step as a div */}
//       {props.steps.map((step, index) => (
//         <div
//           key={index}
//           className="jetbrains-mono text-3xl font-bold mb-6"
//           onClick={() => props.onSelectStep(index)} // Select step on click
//           style={{
//             background: "black",
//             color: "white",
//             width: "252px",
//             minHeight: "50px",
//             padding: "10px",
//             overflowWrap: "break-word",
//             position: "relative",
//             marginLeft:"-20px",
//             fontWeight: "1",
//             fontSize:"20px",
//             marginBottom:"3px",
//             cursor: "pointer",
//           }}
//         >
//           {step.title || "Untitled"} (Step {index + 1})
//         </div>
//       ))}

//       <button onClick={props.onAddStep} className="jetbrains-mono bg-white border px-4 py-1 rounded-lg" style={{ width: "185px", height: "49px", display: "flex", fontSize: "25px", border: "1px solid", borderRadius: "16px", filter: "drop-shadow(0 3px 2px rgba(0, 0, 0, 0.3))" }}>
//         Add Step +
//       </button>
//       <button
//           className="jetbrains-mono bg-white border py-1 rounded-lg"
//           style={{
//             background: "linear-gradient(90deg, #FFFFFF 0%, #E6CDA4 100%)",
//             width: "185px",
//             height: "49px",
//             display: "flex",
//             justifyContent: "center",
//             fontSize: "25px",
//             border: "1px solid",
//             borderRadius: "16px",
//             filter: "drop-shadow(0 3px 2px rgba(0, 0, 0, 0.3))",
//             transition: "background 0.3s ease" // Smooth transition for background change
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = "linear-gradient(90deg, #E6CDA4 0%, #FFFFFF 100%)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = "linear-gradient(90deg, #FFFFFF 0%, #E6CDA4 100%)";
//           }}
//         >
//           Upload
//       </button>
//     </div>
//   );
// }

// export default Panel;
