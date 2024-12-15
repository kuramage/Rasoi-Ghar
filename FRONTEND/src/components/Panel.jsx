import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Panel({ onStepSelect,onImagesReceived, uploadRef, title }) {
  const [steps, setSteps] = useState([1]);
  const [stepTitles, setStepTitles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [null, null, null], // For storing the three images
    imageUploaded: [false, false, false], // Track upload status
  });

  useEffect(() => {
    if (steps.length === 0) {
      setStepTitles([title || "Untitled"]);
    }
  }, [steps.length, title]);

  const handleAddStep = () => {
    const newStep = {
      title: title || "Untitled",
    };

    setSteps((prevSteps) => [...prevSteps, newStep]);
    setStepTitles((prevTitles) => [...prevTitles, title || "Untitled"]);

    if (uploadRef.current) {
      uploadRef.current.handleAddStep();
    }
  };

  const onStepClick = (index) => {
    if (uploadRef.current) {
      uploadRef.current.handleSelectIndex(index);
    }
  };

  // Handle modal visibility
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Handle form data changes (title, description, and images)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Use a different name to avoid shadowing the state formData
    const imageFormData = new FormData();
    imageFormData.append("image", file);
  
    try {
      // Make API request to upload the image
      const response = await fetch("http://localhost:5000/recipeImages/upload", {
        method: "POST",
        body: imageFormData,  // Using imageFormData instead of formData
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }
  
      const data = await response.json();
      console.log(data);
  
      // Extract the image URL from the response
      const imageUrl = data.imageUrl;
      console.log(imageUrl);
  
      // Ensure formData.images is initialized before updating
      const newImages = [...formData.images];
      const newImageUploadedStatus = [...formData.imageUploaded];
  
      // Update the image URL at the correct index
      newImages[index] = imageUrl;
      newImageUploadedStatus[index] = true;
  
      // Update the state with the new values
      setFormData((prev) => ({
        ...prev,
        images: newImages,
        imageUploaded: newImageUploadedStatus,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  
  
  

  // Handle form submission (for the modal)
  const handleSubmit = () => {
    onImagesReceived(formData.images,formData.title,formData.description);
    // Implement the form submission logic (e.g., save the data)
    console.log("Form Data Submitted:", formData);

    // Close the modal after submission
    closeModal();
  };

  return (
    <div className="w-1/5 p-5 flex flex-col items-start space-y-4" style={{ background: "#E6CDA4", boxShadow: "5px 0 10px rgba(0, 0, 0, 0.3)" }}>
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
              overflow: "hidden",
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
            <span
              style={{
                display: "block",
                background: "black",
                color: "white",
                width: "100%",
                fontSize: "20px",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {stepTitles[index] || "Untitled"}
            </span>
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
  
      {/* Update Button to Open Modal */}
      <button
        className="jetbrains-mono bg-white border py-1 rounded-lg"
        style={{
          background: "linear-gradient(90deg, #FFFFFF 0%, #E6CDA4 100%)",
          width: "185px",
          height: "49px",
          display: "flex",
          justifyContent: "center",
          fontSize: "25px",
          border: "1px solid",
          borderRadius: "16px",
          filter: "drop-shadow(0 3px 2px rgba(0, 0, 0, 0.3))",
          transition: "background 0.3s ease", // Smooth transition for background change
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(90deg, #E6CDA4 0%, #FFFFFF 100%)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(90deg, #FFFFFF 0%, #E6CDA4 100%)";
        }}
        onClick={openModal} // Open modal on click
      >
        Update
      </button>
  
      {/* Modal for Updating Step */}
      {modalVisible && (
        <div className="modal" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
          <div className="modal-content" style={{ margin: "50px auto",overflow:"auto", background: "white", padding: "20px", width: "500px", borderRadius: "8px" }}>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid black" }}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", height: "100px", border: "1px solid black" }}
              />
            </div>
            
            {/* Image Uploads */}
            {formData.images.map((image, index) => (
              <div key={index}>
                <label>{`Image ${index + 1}`}</label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                  style={{ marginBottom: "10px", marginLeft: "15px" }}
                />
                {formData.imageUploaded[index] && (
                  <span style={{ color: "green", fontSize: "20px", marginLeft: "10px" }}>✔️</span>
                )}
               
              </div>
            ))}
  
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#E6CDA4",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "18px",
                width: "100%",
                cursor: "pointer",
                transition: "all 0.3s ease", // Smooth transition for hover effects
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#D0B28F"; // Darker shade on hover
                e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge the button
                e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)"; // Add shadow effect
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#E6CDA4"; // Reset background color
                e.currentTarget.style.transform = "scale(1)"; // Reset size
                e.currentTarget.style.boxShadow = "none"; // Remove shadow
              }}
            >
              Submit
            </button>
  
            <button
              onClick={closeModal}
              style={{
                marginTop: "10px",
                backgroundColor: "red",
                padding: "5px 10px",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

Panel.propTypes = {
  onStepSelect: PropTypes.func.isRequired,
  uploadRef: PropTypes.shape({
    current: PropTypes.shape({
      handleAddStep: PropTypes.func,
      handleSelectIndex: PropTypes.func,
    }),
  }),
  title: PropTypes.string, // Expect a title prop
};

Panel.defaultProps = {
  onStepSelect: () => {},
  uploadRef: { current: null },
  title: "", // Default for title
};

export default Panel;





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
      // <button
      //     className="jetbrains-mono bg-white border py-1 rounded-lg"
      //     style={{
      //       background: "linear-gradient(90deg, #FFFFFF 0%, #E6CDA4 100%)",
      //       width: "185px",
      //       height: "49px",
      //       display: "flex",
      //       justifyContent: "center",
      //       fontSize: "25px",
      //       border: "1px solid",
      //       borderRadius: "16px",
      //       filter: "drop-shadow(0 3px 2px rgba(0, 0, 0, 0.3))",
      //       transition: "background 0.3s ease" // Smooth transition for background change
      //     }}
      //     onMouseEnter={(e) => {
      //       e.currentTarget.style.background = "linear-gradient(90deg, #E6CDA4 0%, #FFFFFF 100%)";
      //     }}
      //     onMouseLeave={(e) => {
      //       e.currentTarget.style.background = "linear-gradient(90deg, #FFFFFF 0%, #E6CDA4 100%)";
      //     }}
      //   >
      //     Upload
      // </button>
//     </div>
//   );
// }

// export default Panel;