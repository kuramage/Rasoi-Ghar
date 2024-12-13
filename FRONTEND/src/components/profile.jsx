import React, { Component } from "react";
import PropTypes from "prop-types";
import Sidebar from "./sidebar.jsx";
import hat from "./chef_hat.png";
import utensils from "./utensils.png";
import chole from "./chole/chole_1.jpg";
import chole1 from "./chole/chole_2.jpg";
import chole2 from "./chole/chole_3.jpg";

export class Profile extends Component {
  static propTypes = {};

  recipes = [
    { name: "Khayaali Pulao", likes: 120, description: "There is some description Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut labore nulla iusto? Odio qui ut facere sunt aliquam. Nesciunt, illum!There is some description Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut labore nulla iusto? Odio qui ut facere sunt aliquam. Nesciunt, illum!", url: chole },
    { name: "Bread Bun Maska", likes: 85, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam excepturi officia totam, corrupti culpa, optio nulla suscipit sint iste autem vel repellendus repellat et a.", url: chole1 },
    { name: "Pav Bhaji", likes: 150, description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis obcaecati, quam cumque aut odit eveniet nihil architecto facilis fuga fugit blanditiis saepe aspernatur ex dolorem vero cupiditate molestiae, minima maiores numquam. Odit impedit dignissimos neque ex?", url: chole2 },
    { name: "Butter Chicken", likes: 200, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, consectetur? Odio quisquam atque ab, qui repellat, placeat, esse sint tempore blanditiis dolorum reprehenderit quibusdam quidem ut.", url: chole },
    { name: "Palak Paneer", likes: 95, description: "There is some description Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut labore nulla iusto? Odio qui ut facere sunt aliquam. Nesciunt, illum!", url: chole1 },
    { name: "Khayaali Pulao", likes: 120, description: "There is some description Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut labore nulla iusto? Odio qui ut facere sunt aliquam. Nesciunt, illum!There is some description Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut labore nulla iusto? Odio qui ut facere sunt aliquam. Nesciunt, illum!", url: chole },
    { name: "Bread Bun Maska", likes: 85, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam excepturi officia totam, corrupti culpa, optio nulla suscipit sint iste autem vel repellendus repellat et a.", url: chole1 },
    { name: "Pav Bhaji", likes: 150, description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis obcaecati, quam cumque aut odit eveniet nihil architecto facilis fuga fugit blanditiis saepe aspernatur ex dolorem vero cupiditate molestiae, minima maiores numquam. Odit impedit dignissimos neque ex?", url: chole2 },
    { name: "Butter Chicken", likes: 200, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, consectetur? Odio quisquam atque ab, qui repellat, placeat, esse sint tempore blanditiis dolorum reprehenderit quibusdam quidem ut.", url: chole },
    { name: "Palak Paneer", likes: 95, description: "There is some description Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut labore nulla iusto? Odio qui ut facere sunt aliquam. Nesciunt, illum!", url: chole1 },
  
  
  ];

  state = {
    currentRecipeIndex: 0
  };

  componentDidMount() {
    this.startSlideshow();
  }

  componentWillUnmount() {
    clearInterval(this.slideshowInterval);
  }

  startSlideshow = () => {
    this.slideshowInterval = setInterval(() => {
      this.setState((prevState) => ({
        currentRecipeIndex: (prevState.currentRecipeIndex + 1) % this.recipes.length
      }));
    }, 3000); // Change recipe every 3 seconds
  };

  render() {
    const { currentRecipeIndex } = this.state;
    const currentRecipe = this.recipes[currentRecipeIndex];

    return (
      <div style={{ display: "flex", width: "100%", height: "100vh",overflow:"hidden" }}>
        <div className="side" style={{ width: "20rem" }}>
          <Sidebar />
        </div>

        <div className="two" style={{ width: "30rem" }}>
          <div
            className="pf"
            style={{
              height: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px"
            }}
          >
            <p></p>
            <img
              src={hat}
              alt=""
              style={{
                position: "absolute",
                width: "20vw",
                left: "230px",
                top: "-50px"
              }}
            />
            <img
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
              alt="Profile pic"
              style={{
                height: "45vh",
                width: "25vw",
                borderRadius: "10px",
                boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.8)",
              }}
            />
            <img
              src={utensils}
              alt=""
              style={{
                position: "absolute",
                width: "5vw",
                left: "710px",
                top: "300px",
                transform: "rotate(15deg)"
              }}
            />
          </div>
        

        <div
          className="jetbrains-mono recent"
          style={{
            height: "49vh",
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            top: "-50px"
          }}
        >
          <ul>
  {this.recipes.slice(-5).map((recipe, index) => (
    <li key={index}>
      {index + 1}. {recipe.name} <strong>{recipe.likes}</strong> ❤️
    </li>
  ))}
</ul>

            
        </div>
      </div>

      <div 
  className="jetbrains-mono three" 
  style={{ 
    width: "44rem",
     // Makes this div scrollable
    overflowY: "scroll", // Scroll only within this div
    position: "relative",
    overflowX: "hidden",
    height: "98vh",
    scrollbarWidth: "thin", /* For Firefox */
  scrollbarColor: "#bf7d1f #fff"
  }}
>
  <div
    className="upper"
    style={{
      border: "2px solid black",
      borderRadius: "20px",
      height: "40vh",
      marginTop: "20px",
      display: "flex",
      overflow: "hidden",
      backgroundColor: "#bf7d1f",
    }}
  >
    <div
      className="left"
      style={{
        width: "21vw",
        height: "39.5vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "90%",
        }}
      >
        {currentRecipe.name}
      </h1>
      <p style={{ padding: "15px" }}>
        {currentRecipe.description.length > 30
          ? `${currentRecipe.description.slice(0, 220)}...`
          : currentRecipe.description}
      </p>
    </div>
    <div className="right" style={{ width: "25vw" }}>
      <img
        src={currentRecipe.url}
        alt={currentRecipe.name}
        style={{
          width: "24vw",
          marginTop: "16px",
          padding: "0px",
          height: "35vh",
          objectFit: "cover",
          borderRadius: "20px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.8)",
        }}
      />
    </div>
  </div>

  <div className="lower" style={{ marginTop: "20px", textAlign: "center" }}>
    <div
      className="recipe-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      {this.recipes.map((recipe, index) => (
        <div
          key={index}
          className="recipe-card"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="recipe-image"
            style={{
              height: "120px",
              borderRadius: "10px",
              background: `url(${recipe.url}) no-repeat center center`,
              backgroundSize: "cover",
              marginBottom: "10px",
            }}
          ></div>
          <div className="recipe-info" style={{ textAlign: "left" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                margin: "5px 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {recipe.name}
            </h3>
            <p style={{ fontSize: "12px", color: "#555", margin: "5px 0" }}>
              <span style={{ fontSize: "12px", color: "#555" }}>
                {recipe.likes} likes
              </span>
              <span style={{ fontSize: "18px", color: "red", cursor: "pointer" }}>
                ♥
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
    );
  }
}

export default Profile;
