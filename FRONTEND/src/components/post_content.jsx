import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageSlider from './imageslider';

export class PostContent extends Component {
  static propTypes = {
    recipeId: PropTypes.string.isRequired, // Expect recipeId as a required prop
  };

  state = {
    recipe: null,
    loading: true,
    error: null,
    stepsData: [], // State to hold steps array
  };

  componentDidMount() {
    const { recipeId } = this.props;
    this.fetchRecipeDetails(recipeId);
  }

  // Function to fetch recipe data from the API
  fetchRecipeDetails = (recipeId) => {
    fetch(`http://localhost:5000/recipes/${recipeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        const recipe = data.data;

        // Map fetched steps into the desired structure
        const stepsData = recipe.stepsTitles.map((title, index) => ({
          id: index + 1,
          title: `${index + 1}. ${title}`,
          image: recipe.recipeImages[index] , // Default image if not available
        }));

        this.setState({
          recipe,
          stepsData, // Update stepsData in state
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  };

  render() {
    const { loading, error, recipe, stepsData } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    // Render the recipe content
    return (
      <div className="chole-puri-container" style={{ height: '99vh', overflowY: 'auto' }}>
        {/* Recipe Header Section */}
        <div className="post-open-middle" style={{ display: 'flex', height: '55vh', marginBottom: '20px' }}>
          {/* Image Slider */}
          <div className="post-photos" style={{ width: '60%', paddingRight: '20px' }}>
            <ImageSlider images={recipe.recipeImages || []} />
          </div>

          {/* Recipe Details */}
          <div className="details" style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'Istok Web, sans-serif', fontSize: '48px' }}>{recipe.recipeName}</h2>
            <div className="interaction" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '24px' }}>❤️ {recipe.recipeLikes.length || 0} Likes</span>
              <button
                style={{
                  height: '50px',
                  padding: '0 20px',
                  fontSize: '18px',
                  color: 'white',
                  backgroundColor: '#f76c6c',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Let's cook 🧑‍🍳
              </button>
            </div>
            <p style={{ fontFamily: 'Istok Web, sans-serif', fontSize: '18px', lineHeight: '1.5' }}>
              {recipe.recipeDescription}
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="step-heading" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <hr style={{ flex: 1, border: 'none', borderBottom: '2px solid #ddd' }} />
          <span
            style={{
              margin: '0 20px',
              fontSize: '20px',
              color: 'grey',
              fontWeight: 'bold',
            }}
          >
            Steps
          </span>
          <hr style={{ flex: 1, border: 'none', borderBottom: '2px solid #ddd' }} />
        </div>

        <div className="steps" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {stepsData.map((step) => (
            <div
              key={step.id}
              className="step"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={step.image}
                alt={`Step ${step.id}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 'bold' }}>{step.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PostContent;
