import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chole1 from './chole/chole_1.jpg';
import chole2 from './chole/chole_2.jpg';
import chole3 from './chole/chole_3.jpg';

export class PostContent extends Component {
  static propTypes = {
    // Define any prop types here if needed
  };

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      images: [chole1, chole2, chole3],
      showButtons: false,
    };
    this.intervalId = null; // Store interval ID for cleanup
  }

  componentDidMount() {
    this.startAutoChange();
  }

  componentWillUnmount() {
    this.clearAutoChange();
  }

  startAutoChange = () => {
    this.intervalId = setInterval(this.nextImage, 2000); // Change image every 3 seconds
  };

  clearAutoChange = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  nextImage = () => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % prevState.images.length,
    }));
  };
  prevImage = () => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex - 1 + prevState.images.length) % prevState.images.length,
    }));
  };
  handleMouseEnter = () => {
    this.clearAutoChange(); // Stop changing images on mouse enter
    this.setState({ showButtons: true });
  };

  handleMouseLeave = () => {
    this.startAutoChange(); // Resume changing images on mouse leave
    this.setState({ showButtons: false });
  };

  render() {
    const { images, currentIndex, showButtons } = this.state;

    return (
      <div className="chole-puri-container" style={{ height: "35vh" }}>
        <div className="post-open-middle" style={{ display: "flex", height: "55vh", marginBottom: "10px" }}>
          <div className="post-photos" style={{ width: "35vw" }}>
            <div
              className="carousel"
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              style={{ position: "relative", textAlign: "center", top: "-15px" }}
            >
              <div className="carousel-slide" style={{ transition: "opacity 0.5s" }}>
                <img
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  className="carousel-image"
                  style={{ width: "30vw", height: "35vh", position: "relative", top: "20px" }}
                />
                {showButtons && (
                  <>
                    <button
                      className="carousel-button prev"
                      onClick={this.prevImage}
                      aria-label="Previous Image"
                      style={buttonStyle}
                    >
                      ❮
                    </button>
                    <button
                      className="carousel-button next"
                      onClick={this.nextImage}
                      aria-label="Next Image"
                      style={buttonStyle}
                    >
                      ❯
                    </button>
                  </>
                )}
              </div>
              <div className="carousel-indicators" style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex" }}>
                {images.map((_, index) => (
                  <div
                    key={index}
                    className="indicator"
                    style={{
                      height: "12px",
                      width: "12px",
                      borderRadius: "50%",
                      backgroundColor: currentIndex === index ? "black" : "white",
                      border: "2px solid black",
                      margin: "0 5px",
                      cursor: "pointer"
                    }}
                    onClick={() => this.setState({ currentIndex: index })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const buttonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "transparent",
  border: "none",
  color: "black",
  fontSize: "24px",
  cursor: "pointer",
  padding: "0",
};

export default PostContent;
