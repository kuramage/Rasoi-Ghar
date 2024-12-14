import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Middle from './middle'
import Content from './content'
export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishName: "Dal Makhni", // Shared state
      description:
        "Dal makhani is an Indian dish originating in Delhi. A relatively modern variation of traditional lentil dishes, it is made with urad dal and other pulses, and includes butter and cream.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officia debitis, maxime ut omnis ipsum at ipsa cumque, odit dolore quam sint!",
      isHovered: false, // Hover state
    };
  }

  // Method to update dishName and description
  updateDish = (newDishName) => {
    this.setState({ dishName: newDishName });
  };

  // Method to update hover state
  updateHoverState = (hoverState) => {
    this.setState({ isHovered: hoverState });
  };

  render() {
    return (
      <div className='containeer' style={{ display: "flex" }}>
      <div className="slide">
        <Sidebar />
      </div>

        <div className="middle" style={{ width: "60vw", position: "relative", left: "250px", display: "flex", justifyContent: "center" }}>
          {/* Pass the hoverState, dishName, description, and update methods to Middle */}
          <Middle
            dishName={this.state.dishName}
            description={this.state.description}
            updateDish={this.updateDish}
            updateHoverState={this.updateHoverState}  // Pass hoverState update function
          />
        </div>

        <div style={{ width: "5vw", position: "relative", left: "247px" }}>
          {/* Pass the hoverState and dishName to Content */}
          <Content
            dishName={this.state.dishName}
            description={this.state.description}
            isHovered={this.state.isHovered}  // Pass hover state
          />
        </div>
      </div>
    )
  }
}

export default home