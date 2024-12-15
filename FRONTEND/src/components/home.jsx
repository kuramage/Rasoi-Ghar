import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';
import Middle from './middle';
import Content from './content';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishName: "Dal Makhni", // Default dish name
      description: "Dal makhani is an Indian dish originating in Delhi. A relatively modern variation of traditional lentil dishes, it is made with urad dal and other pulses, and includes butter and cream.",
      isHovered: false, // Hover state
      dishes: [], // Store all fetched dishes
      selectedRecipeID: null, // Store selected recipeID
    };
  }

  // Fetch recipe API data
  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes"); // Replace with your actual API URL
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch recipes.");
      }

      // Log the data to the console
      console.log("Fetched recipes:", data);

      // Optionally, update the state with the fetched data
      if (data.data && data.data.length > 0) {
        this.setState({
          dishes: data.data, // Store all fetched dishes in state
          dishName: data.data[0].recipeName, // Set the first recipe's name as default
          description: data.data[0].recipeDescription, // Set the first recipe's description as default
        });
      }
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  };

  // Method to update dishName and description when a dish is hovered
  updateDish = (newDish) => {
    this.setState({
      dishName: newDish.recipeName,
      description: newDish.recipeDescription,
    });
  };

  // Method to update hover state
  updateHoverState = (hoverState) => {
    this.setState({ isHovered: hoverState });
  };

  // Method to handle dish click and set recipeID
  handleDishClick = (recipeID) => {
    this.setState({ selectedRecipeID: recipeID });
    console.log("Selected Recipe ID:", recipeID); // Log the selected recipeID
  };

  render() {
    return (
      <div className="containeer" style={{ display: "flex" }}>
        <div className="slide">
          <Sidebar />
        </div>

        <div
          className="middle"
          style={{
            width: "60vw",
            position: "relative",
            left: "250px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Pass the hoverState, dishName, description, and update methods to Middle */}
          <Middle
            dishes={this.state.dishes} // Pass fetched dishes as props to Middle
            updateDish={this.updateDish}
            updateHoverState={this.updateHoverState} // Pass hoverState update function
            onDishClick={this.handleDishClick} // Pass click handler to Middle
          />
        </div>

        <div style={{ width: "5vw", position: "relative", left: "247px" }}>
          {/* Pass the hoverState and dishName to Content */}
          <Content
            dishName={this.state.dishName} // Pass the current dish name
            description={this.state.description} // Pass the description
            isHovered={this.state.isHovered} // Pass hover state
          />
        </div>
      </div>
    );
  }
}

export default Home;
