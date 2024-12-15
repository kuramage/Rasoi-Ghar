import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./sidebar";
import MainContent from "./upload";
import Panel from "./Panel";

const UploadPost = () => {
  const [title, setTitle] = useState("untitled");
  const [steps, setSteps] = useState([]); // Array to hold saved steps
  const [currentStepIndex, setCurrentStepIndex] = useState(null); // Set to null when no step is selected
  const [images, setImages] = useState([]); // Array to store images for each step
  const [recipe_name, setRecipeName] = useState(""); // String for recipe name
  const [recipe_desc, setRecipeDesc] = useState(""); // String for recipe description
  const [issubmit, setIssubmit] = useState(0); // Track submission status
  const uploadRef = useRef();
  let user = localStorage.getItem("user"); // Retrieve the JSON string from localStorage
  let userObject = JSON.parse(user); // Parse the JSON string into an object
  let userId = userObject.id; // Access the `id` field
  
  ; // Output: 07f1b867-7c59-4b6c-97e1-c55c37bc6b52
  
  // Handles selecting a step and loading its data
  const handleStepSelect = (index) => {
    uploadRef.current.handleSelectIndex(index); // Select the entry in Upload
  };

  // Updates the title state
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  // Adds a new step and updates the list of steps
  const addStep = (stepData) => {
    console.log("Adding step");

    setSteps((prevSteps) => {
      const newStep = {
        videoLink: stepData.videoLink || "", // Default value if not provided
        notes: stepData.notes || "", // Default value if not provided
        ingredients: stepData.ingredients || [], // Default value if not provided
        title: stepData.title || "", // Default value if not provided
      };

      // Add the new step to the steps array
      const newSteps = [...prevSteps, newStep];
      setCurrentStepIndex(newSteps.length - 1); // Set current index to the latest step
      console.log("New Step Added:", newStep); // Log the new step added

      // Log the steps array after adding the new step
      console.log("Updated Steps Array:", newSteps);

      return newSteps;
    });
  };

  // Updates the images state when images are received
  const handleImagesReceived = (newImages, recipe_name, recipe_desc) => {
    setImages(newImages);
    setRecipeName(recipe_name);
    setRecipeDesc(recipe_desc);
    setIssubmit(1); // Mark as ready for submission
  };

  // Function to generate the final output when issubmit is 1
  const generateOutput = () => {
    if (issubmit === 1) {
      // Collect the video, notes, ingredients, and titles from the steps array
      const stepsVideos = steps.map(step => step.videoLink); // Assuming step has videoLink
      const stepsNotes = steps.map(step => step.notes); // Assuming step has notes
      const stepsIngredients = steps.map(step => step.ingredients); // Assuming step has ingredients
      const stepsTitles = steps.map(step => step.title); // Assuming step has title

      // Final output object
      const output = {
        stepsVideos: stepsVideos,
        stepsNotes: stepsNotes,
        stepsIngredients: stepsIngredients,
        stepsTitles: stepsTitles,
        userId:  userId, // Use the user_id from localStorage
        recipeName: recipe_name, // Recipe name from the state
        recipeDescription: recipe_desc, // Recipe description from the state
        recipeImages: images, // Images stored in the state
      };

      // Log the final output for debugging
      console.log("Final Output: ", output);

      return output;
    }
  };

  // Submit the recipe to the API and reset issubmit to 0 upon success
  const submitRecipe = async (output) => {
    try {
      const apiUrl = "http://localhost:5000/recipes/"; // Replace with your API URL
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(output),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Recipe submitted successfully:", data);

        // Reset issubmit to 0 after successful submission
        setIssubmit(0); // Reset the submission state
      } else {
        const errorData = await response.json();
        console.error("Error submitting recipe:", errorData.message);
      }
    } catch (error) {
      console.error("Error during API request:", error.message);
    }
  };

  useEffect(() => {
    if (issubmit === 1) {
      const output = generateOutput();
      if (output) {
        console.log("Submitting output:", output);
        submitRecipe(output); // Submit the output to the API
      }
    }
  }, [issubmit]);

  const currentStepData = steps[currentStepIndex] || {}; // Load the currently selected step data

  return (
    <div className="flex h-screen">
      <Sidebar isUploadActive={true} />
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
          currentStepIndex={currentStepIndex}
          onStepSelect={handleStepSelect}
          uploadRef={uploadRef}
          onImagesReceived={handleImagesReceived}
        />
      </div>
    </div>
  );
};

export default UploadPost;
