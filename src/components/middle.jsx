import React, { useState } from 'react';
import logo from './logo.png'
const Middle = ({ dishName, description, updateDish, updateHoverState }) => {
  const [hoveredPostIndex, setHoveredPostIndex] = useState(null);

  const handlePlateHover = (index) => {
    setHoveredPostIndex(index); // Set the hovered index for the plate
    updateHoverState(true); // Notify the parent component
  };

  const handlePlateLeave = () => {
    setHoveredPostIndex(null); // Reset the hovered index
    updateHoverState(false); // Notify the parent component
  };

  const posts = Array.from({ length: 21 }, (_, index) => `Post ${index + 1}`);
  const columns = [[], [], []];

  posts.forEach((post, index) => {
    columns[index % 3].push(post);
  });

  return (
    <div className="container">
      {columns.map((col, colIndex) => (
        <div className={`column column-${colIndex + 1}`} key={colIndex}>
          {colIndex === 1 && (
            <div className="top-box" style={{ marginBottom: "1px" }}>
              <h2>This is a Box at the Top of Column 2</h2>
            </div>
          )}
          {col.map((post, postIndex) => {
            const currentIndex = `${colIndex}-${postIndex}`;
            const isHovered = hoveredPostIndex === currentIndex;

            return (
              <div
                className={`post post-${colIndex + 1} ${isHovered ? 'hover' : ''}`} // Apply hover class to the post
                key={postIndex}
              >
                <div
                  className={`plate ${isHovered ? 'hovered' : ''}`} // Apply hovered class on the plate
                  onMouseOver={() => handlePlateHover(currentIndex)}  // Handle hover on plate
                  onMouseLeave={handlePlateLeave}  // Handle leave on plate
                >
                  <img src="/" alt="Dish" />
                </div>
                {/* <p style={{ fontSize: "20px" }}>❤️ 52</p> */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Middle;
