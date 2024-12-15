import React, { Component } from "react";
import upload_img from "./upload_btn.png";
import plus from "./plus.png";
import cross from "./cross-removebg-preview.png";
import "typeface-jetbrains-mono";
import Panel from "./Panel"; // Ensure Panel is imported

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      videoUrl: null,
      videoLink: "", // Added videoLink state
      notes: "",
      isEditingNotes: false,
      searchQuery: "",
      selectedIngredients: [],
      dataArray: [],
      currentIndex: null, // Changed to null for no selection
    };
    this.ingredientData = {
      a: ["apple", "apricot"],
      b: ["banana", "broccoli"],
      c: ["chicken breast", "chicken thigh"],
      d: ["dill", "dates"],
      e: ["eggplant", "elderberry"],
      f: ["fig", "fennel"],
      g: ["garlic", "ginger"],
      h: ["honey", "hummus"],
      // add more letters as needed
    };
  }

  handleChange = (event) => {
    const newTitle = event.target.value;
    this.setState({ title: newTitle });
    this.props.onTitleChange(newTitle);
  };

  handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Generate a temporary URL for video preview
      const videoUrl = URL.createObjectURL(file);
      this.setState({ videoUrl });
  
      // Prepare form data for the API request
      const formData = new FormData();
      formData.append("video", file);
  
      try {
        // Send the video to the API
        const response = await fetch("http://localhost:5000/stepsVideos/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload video. Please try again.");
        }
  
        const data = await response.json();
        const videoLink = data.videoUrl;
  
        // Save the returned video URL in the state
        this.setState({ videoLink });
        alert("Video uploaded successfully!");
      } catch (error) {
        console.error("Error uploading video:", error.message);
        alert(error.message);
      }
    }
  };
  

  handlePlusClick = () => {
    this.setState({ isEditingNotes: true, notes: "" });
  };

  handleNotesChange = (event) => {
    this.setState({ notes: event.target.value });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSuggestionClick = (ingredient) => {
    if (!this.state.selectedIngredients.includes(ingredient)) {
      this.setState((prevState) => ({
        selectedIngredients: [...prevState.selectedIngredients, ingredient],
        searchQuery: "",
      }));
    }
  };

  handleDeleteIngredient = (ingredient) => {
    this.setState((prevState) => ({
      selectedIngredients: prevState.selectedIngredients.filter((item) => item !== ingredient),
    }));
  };

  // Method to handle videoLink input change
  handleVideoLinkChange = (event) => {
    this.setState({ videoLink: event.target.value });
  };

  // This method will be called by the Panel to save a new step
  handleAddStep = () => {
    const { title, videoLink, notes, selectedIngredients } = this.state;
    const newData = { title:title, videoLink: videoLink, description: notes, ingredients: selectedIngredients };
  
    console.log(newData); // Log the step data to verify
  
    // Call the onAddStep method passed down from the parent (UploadPost)
    this.props.onAddStep(newData);
  
    // Update local state (dataArray) to reflect the new step
    this.setState((prevState) => ({
      dataArray: [...prevState.dataArray, newData],
      title: "",
      videoUrl: null,
      notes: "",
      selectedIngredients: [],
      isEditingNotes: false,
    }));
  };
  
  

  // Method to handle selecting an entry from Panel
  handleSelectIndex = (index) => {
    if (index === this.state.dataArray.length ) {
      // Reset all fields to initial state if the latest entry is selected
      this.setState({
        currentIndex: index,
        title: "",
        videoUrl: null,
        notes: "",
        selectedIngredients: [],
        isEditingNotes: false,
      });
    } else {
      const selectedData = this.state.dataArray[index];
      this.setState({
        currentIndex: index,
        title: selectedData.title,
        videoUrl: selectedData.videoUrl,
        notes: selectedData.description,
        selectedIngredients: selectedData.ingredients,
        isEditingNotes: selectedData.description ? true : false,
      });
    }
  };

  render() {
    const {
      title,
      videoUrl,
      videoLink, // Add videoLink to destructuring
      isEditingNotes,
      notes,
      searchQuery,
      selectedIngredients,
      dataArray,
      currentIndex,
    } = this.state;

    const currentData = dataArray[currentIndex] || {}; // Access current data based on selected index
    const suggestions = searchQuery
      ? Object.keys(this.ingredientData)
          .flatMap((letter) => this.ingredientData[letter])
          .filter((ingredient) =>
            ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          )
      : [];

    return (
      <div className="flex-1 p-8">
        {/* Title Input */}
        <input
          type="text"
          placeholder="untitled"
          className="jetbrains-mono"
          value={title}
          onChange={this.handleChange}
          style={{
            outline: "none",
            fontSize: "45px",
            fontWeight: "normal",
            position: "relative",
            top: "-10px",
          }}
        />

        {/* Video Upload Section */}
        <div className="video border-2 border-gray-300 rounded-lg h-64 flex items-center justify-center mb-6" style={{ height: "43vh", width: "55vw", flexDirection: "column", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          {videoUrl ? (
            <video controls style={{ height: "100%", width: "100%" }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <label htmlFor="video-upload" style={{ cursor: "pointer" }}>
                <img src={upload_img} alt="upload" style={{ height: "50px" }} />
              </label>
              <input type="file" id="video-upload" accept="video/*" onChange={this.handleFileChange} style={{ display: "none" }} />
              <p style={{ fontSize: "30px", fontFamily: "JetBrains Mono", color: "black" }}>Upload video of step</p>
            </>
          )}
        </div>

        {/* Video Link Section */}
        {/* <div className="video-link-section mb-6">
          <input
            type="text"
            placeholder="Enter video URL"
            value={videoLink}
            onChange={this.handleVideoLinkChange}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
              marginBottom: "10px",
            }}
          />
        </div> */}

        {/* Notes and Ingredients Section */}
        <div className="below" style={{ display: "flex", justifyContent: "space-between", height: "40vh" }}>
          {/* Notes Area */}
          <div className="Notes border-2 rounded-lg p-10 text-center mb-6" style={{ background: "#E6CDA4", width: "35vw", height: "35vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {isEditingNotes ? (
              <textarea
                className="jetbrains-mono"
                value={notes}
                onChange={this.handleNotesChange}
                onBlur={() => {
                  if (notes.trim() === "") {
                    this.setState({ isEditingNotes: false });
                  }
                }}
                style={{
                  outline: "none",
                  fontSize: "14px",
                  border: "none",
                  width: "100%",
                  height: "100%",
                  background: "#E6CDA4",
                  resize: "none",
                  overflow: "auto",
                }}
                autoFocus
              />
            ) : (
              <>
                <img src={plus} alt="" style={{ height: "50px", width: "50px", marginBottom: "20px", cursor: "pointer" }} onClick={this.handlePlusClick} />
                <p className="jetbrains-mono text-xl font-light">optional description</p>
              </>
            )}
          </div>

          {/* Ingredients Area */}
          <div className="jetbrains-mono" style={{ width: "35%" }}>
            <h2 className="font-bold text-2xl mb-2">Ingredients:</h2>
            <ul className="list-disc pl-5 max-h-32 overflow-y-auto " style={{ marginBottom: "20px" }}>
              {selectedIngredients.map((ingredient, index) => (
                <li key={index} className="text-lg mb-2">
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <span style={{ flex: "1", marginLeft: "5px" }}>{ingredient}</span>
                    <img src={cross} alt="cross button" onClick={() => this.handleDeleteIngredient(ingredient)} style={{ height: "20px", cursor: "pointer", position: "relative", left: "30px" }} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Ingredient Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search ingredients"
              className="border rounded-lg p-2 w-full mb-2  border-gray-300"
            />

            {suggestions.length > 0 && (
              <div className="border rounded-lg max-h-32 overflow-y-auto" style={{ border: "1px solid" }}>
                {suggestions.map((ingredient, index) => (
                  <div key={index} onClick={() => this.handleSuggestionClick(ingredient)} style={{ padding: "8px", cursor: "pointer" }} className="hover:bg-gray-200">
                    {ingredient}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Upload.defaultProps = {
  onTitleChange: () => {},
};

export default Upload;
