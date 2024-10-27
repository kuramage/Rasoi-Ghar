import React, { Component } from "react";
import upload_img from "./upload_btn.png";
import plus from "./plus.png";
import cross from "./cross-removebg-preview.png";
import "typeface-jetbrains-mono";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      videoUrl: null,
      description: "",
      isEditingNotes: false,
      notes: "",
      searchQuery: "",
      selectedIngredients: [],
      dataArray: [],
      currentIndex: 0,
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
    };
  }

  handleChange = (event) => {
    const newTitle = event.target.value;
    this.setState({ title: newTitle });
    this.props.onTitleChange(newTitle);
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      this.setState({ videoUrl });
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

  handleSaveData = () => {
    const { title, videoUrl, notes, selectedIngredients } = this.state;
    const newData = { title, videoUrl, description: notes, ingredients: selectedIngredients };

    this.setState((prevState) => ({
      dataArray: [...prevState.dataArray, newData],
      currentIndex: prevState.dataArray.length, // Set to the newly added index
      title: "",
      videoUrl: null,
      notes: "",
      selectedIngredients: [],
    }));
  };

  handleSelectIndex = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    const {
      title,
      videoUrl,
      isEditingNotes,
      notes,
      searchQuery,
      selectedIngredients,
      dataArray,
      currentIndex,
    } = this.state;

    const currentData = dataArray[currentIndex] || {};
    const suggestions = searchQuery
      ? Object.keys(this.ingredientData)
          .flatMap((letter) => this.ingredientData[letter])
          .filter((ingredient) =>
            ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          )
      : [];

    return (
      <div className="flex-1 p-8">
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

        <div className="video border-2 border-gray-300 rounded-lg h-64 flex items-center justify-center mb-6" style={{ height: "43vh", width: "55vw", flexDirection: "column" }}>
          {!videoUrl ? (
            <>
              <label htmlFor="video-upload" style={{ cursor: "pointer" }}>
                <img src={upload_img} alt="upload" style={{ height: "50px" }} />
              </label>
              <input type="file" id="video-upload" accept="video/*" onChange={this.handleFileChange} style={{ display: "none" }} />
              <p style={{ fontSize: "30px", fontFamily: "JetBrains Mono", color: "black" }}>Upload video of step</p>
            </>
          ) : (
            <video controls style={{ height: "100%", width: "100%" }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="below" style={{ display: "flex", justifyContent: "space-between", height: "40vh" }}>
          <div className="Notes border-2 rounded-lg p-10 text-center mb-6" style={{ background: "#E6CDA4", width: "35vw", height: "35vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {isEditingNotes ? (
              <>
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
              </>
            ) : (
              <>
                <img src={plus} alt="" style={{ height: "50px", width: "50px", marginBottom: "20px", cursor: "pointer" }} onClick={this.handlePlusClick} />
                <p className="jetbrains-mono text-xl font-light">optional description</p>
              </>
            )}
          </div>

          <div className="jetbrains-mono" style={{ width: "35%" }}>
            <h2 className="font-bold text-2xl mb-2">Ingredients:</h2>
            <ul className="list-disc pl-5 max-h-32 overflow-y-auto" style={{ marginBottom: "20px" }}>
              {selectedIngredients.map((ingredient, index) => (
                <li key={index} className="text-lg mb-2">
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <span style={{ flex: "1", marginLeft: "5px" }}>{ingredient}</span>
                    <img src={cross} alt="cross button" onClick={() => this.handleDeleteIngredient(ingredient)} style={{ height: "20px", cursor: "pointer" }} />
                  </div>
                </li>
              ))}
            </ul>

            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search ingredients"
              className="border rounded-lg p-2 w-full mb-2"
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

        {/* Save Button */}
        <button onClick={this.handleSaveData} className="jetbrains-mono bg-blue-500 text-white rounded-lg p-2">
          Save Data
        </button>

        {/* Display Previous Entries */}
      
        <div className="mt-4">
          <h2>Saved Entries:</h2>
          <ul>
            {dataArray.map((data, index) => (
              <li
                key={index}
                onClick={() => this.handleSelectIndex(index)}
                style={{ cursor: "pointer", padding: "5px", border: "1px solid #ccc", marginBottom: "5px" }}
              >
                {data.title ? data.title : "Untitled"} {/* Clearly state "Untitled" if no title */}
              </li>
            ))}
          </ul>
        </div>


        {/* Display Selected Data */}
        {currentData.title && (
          <div>
            <h2>Current Entry:</h2>
            <h3>{currentData.title}</h3>
            <p>{currentData.description}</p>
            <video controls style={{ height: "200px", width: "300px" }}>
              <source src={currentData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h4>Ingredients:</h4>
            <ul>
              {currentData.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
Upload.defaultProps = {
  onTitleChange: () => {},
};
export default Upload;
