import React, { Component } from "react";

export class Content extends Component {
  state = {
    displayedDishName: "",
    typingIndexDish: 0,
    displayedDescription: "",
    typingIndexDesc: 0,
  };

  // When the component mounts, start typing the dish name and description
  componentDidMount() {
    this.typeWriterEffect(this.props.dishName, "name");
    this.typeWriterEffect(this.props.description, "description");
  }

  // When the dishName or description prop changes, reset the state and restart the typewriter effect
  componentDidUpdate(prevProps) {
    if (prevProps.dishName !== this.props.dishName) {
      this.setState({ displayedDishName: "", typingIndexDish: 0 }, () => {
        this.typeWriterEffect(this.props.dishName, "name");
      });
    }
    if (prevProps.description !== this.props.description) {
      this.setState({ displayedDescription: "", typingIndexDesc: 0 }, () => {
        this.typeWriterEffect(this.props.description, "description");
      });
    }
  }

  // Typewriter effect for typing the text
  typeWriterEffect = (text, type) => {
    const delay = 50; // Typing speed in ms
    const stateKey = type === "name" ? "typingIndexDish" : "typingIndexDesc";
    const displayedKey = type === "name" ? "displayedDishName" : "displayedDescription";

    const interval = setInterval(() => {
      if (this.state[stateKey] < text.length) {
        this.setState((prevState) => ({
          [displayedKey]: prevState[displayedKey] + text[prevState[stateKey]],
          [stateKey]: prevState[stateKey] + 1,
        }));
      } else {
        clearInterval(interval);
      }
    }, delay);
  };

  render() {
    const { isHovered } = this.props;
    const { displayedDishName, displayedDescription } = this.state;

    // Add fade-in or fade-out class based on the hover state
    const fadeInOutClass = isHovered ? "fade-in" : "fade-out";

    return (
      <div className="right-section" style={{ position: "fixed", width: "20vw", top: 0, right: 0, padding: "20px" }}>
        <h1
          className={`content-title ${fadeInOutClass}`}
          style={{
            fontSize: "55px",
            lineHeight: "80px",
            marginBottom: "8px",
            transition: "opacity 0.5s", // Smooth transition for opacity
          }}
        >
          {displayedDishName}
        </h1>
        <p
          className={`content-description ${fadeInOutClass}`}
          style={{
            fontSize: "20px",
            lineHeight: "1.5",
            color: "#555",
            transition: "opacity 0.5s", // Smooth transition for opacity
          }}
        >
          {displayedDescription}
        </p>
      </div>
    );
  }
}

export default Content;
