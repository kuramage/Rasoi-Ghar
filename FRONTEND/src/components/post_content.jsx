import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageSlider from './imageslider';
import chole1 from './chole/chole_1.jpg';
import chole2 from './chole/chole_2.jpg';
import chole3 from './chole/chole_3.jpg';

export class PostContent extends Component {
  static propTypes = {
    recipeId: PropTypes.string.isRequired, // Expect recipeId as a prop
  };

  state = {
    recipe: null,
    loading: true,
    error: null,
  };

  // Fetch recipe details when the component mounts
  componentDidMount() {
    const { recipeId } = this.props;
    this.fetchRecipeDetails(recipeId);
  }

  // Function to fetch recipe data from the API
  fetchRecipeDetails = (recipeId) => {
    // Using the fetch API to make a GET request to the server
    fetch(`http://localhost:5000/recipes/${recipeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        // Update the state with the fetched recipe data
        this.setState({
          recipe: data.data, // Assuming the response has a 'data' field with recipe details
          loading: false,
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  };

  render() {
    const { loading, error, recipe } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Show loading state
    }

    if (error) {
      return <div>Error: {error}</div>; // Show error message
    }

    // Render the recipe content if the data is available
    return (
      <div className="chole-puri-container" style={{ height: "99vh" }}>
        <div className="post-open-middle" style={{ display: "flex", height: "55vh", marginBottom: "10px" }}>
          <div className="post-photos" style={{ width: "100vw" }}>
            <div className="carousel">
              <ImageSlider />
            </div>
          </div>

          <div className="details" style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{ fontFamily: 'Istok Web, sans-serif', fontSize: "60px" }}>
              {recipe.name} {/* Display recipe name */}
            </h2>

            <div className="interaction" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span className="like" style={{ fontSize: "30px" }}>
                ❤️ {recipe.likes} {/* Display likes */}
              </span>
              <button className="button" style={{ height: "8vh", width: "20vw", fontSize: "30px", color: "black", position: "relative", left: "-120px" }}>
                Let's cook 🧑‍🍳
              </button>
            </div>

            <div style={{ fontFamily: 'Istok Web, sans-serif', fontSize: "24px" }}>
              <p>
                {recipe.description} {/* Display recipe description */}
              </p>
            </div>
          </div>
        </div>

        <div className="step-heading" style={{ display: "flex" }}>
          <hr style={{ border: "none", borderBottom: "4px solid grey", margin: "0", width: "38vw" }} />
          <span className="jetbrains-mono" style={{ margin: "0px 40px 0px 50px", fontSize: "25px", position: "relative", top: "-17px", color: "grey" }}>
            Steps
          </span>
          <hr style={{ border: "none", borderBottom: "4px solid grey", margin: "0", width: "40vw" }} />
        </div>

        <div className="steps">
          {/* Map through the steps and render them */}
          {recipe.steps && recipe.steps.map((step, index) => (
            <div className="step" key={index}>
              <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />
              <div className="step-text">
                <span>{step.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PostContent;
