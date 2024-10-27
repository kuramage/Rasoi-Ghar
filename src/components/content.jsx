import React, { Component } from 'react';

export class Content extends Component {
  state = {
    displayedDishName: '',
    displayedDescription: '',
    typingIndexDish: 0,
    typingIndexDesc: 0,
  };

  componentDidMount() {
    this.typeWriterEffect(this.props.dishName, 'dishName');
    this.typeWriterEffect(this.props.description, 'description');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dishName !== this.props.dishName) {
      this.setState({ displayedDishName: '', typingIndexDish: 0 }, () => {
        this.typeWriterEffect(this.props.dishName, 'dishName');
      });
    }
    if (prevProps.description !== this.props.description) {
      this.setState({ displayedDescription: '', typingIndexDesc: 0 }, () => {
        this.typeWriterEffect(this.props.description, 'description');
      });
    }
  }
  
  typeWriterEffect = (text, type) => {
    // Set different typing speeds
    const delay = type === 'dishName' ? 10 : 50; // Adjust the delay for dish name and description
  
    const interval = setInterval(() => {
      if (type === 'dishName' && this.state.typingIndexDish < text.length) {
        this.setState((prevState) => ({
          displayedDishName: prevState.displayedDishName + text[prevState.typingIndexDish],
          typingIndexDish: prevState.typingIndexDish + 1,
        }));
      } else if (type === 'description' && this.state.typingIndexDesc < text.length) {
        this.setState((prevState) => ({
          displayedDescription: prevState.displayedDescription + text[prevState.typingIndexDesc],
          typingIndexDesc: prevState.typingIndexDesc + 1,
        }));
      } else {
        clearInterval(interval);
        // After the dish name is fully typed, start typing the description
        if (type === 'dishName') {
          setTimeout(() => {
            this.typeWriterEffect(this.props.description, 'description');
          }, 500); // Delay before typing description
        }
      }
    }, delay);
  };
  

  render() {
    const { isHovered } = this.props;
    const { displayedDishName, displayedDescription } = this.state;

    // CSS classes for animations
    const fadeInOutClass = isHovered ? 'fade-in' : 'fade-out';

    return (
      <div className="right-section" style={{ position: "fixed", width: "20vw" }}>
        {/* Animated Dish Name */}
        <h1 className={`content-title ${fadeInOutClass}`} style={{ fontSize: "80px", lineHeight: "80px", marginBottom: "5px" }}>
          {displayedDishName}
        </h1>

        {/* Animated Tags */}
        <div className={`tags ${fadeInOutClass}`}>
          <span>(veg)</span>
          <span>(biryani)</span>
          <span>(mughlai)</span>
          <span>(lunch)</span>
          <span>(uttar pradesh)</span>
        </div>

        {/* Animated Description */}
        <p className={`content-description ${fadeInOutClass}`}>
          {displayedDescription}
        </p>
      </div>
    );
  }
}

export default Content;
