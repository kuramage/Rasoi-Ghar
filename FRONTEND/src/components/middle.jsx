import React, { useState } from "react";

const Middle = ({ dishes, updateDish, updateHoverState }) => {
  const [hoveredDishIndex, setHoveredDishIndex] = useState(null);

  // Handle hover on plate
  const handlePlateHover = (index, dish) => {
    setHoveredDishIndex(index); // Set the hovered dish index
    updateHoverState(true); // Notify parent component of hover
    updateDish(dish); // Pass the hovered dish to the parent
  };

  // Handle hover leave
  const handlePlateLeave = () => {
    setHoveredDishIndex(null); // Reset hovered index
    updateHoverState(false); // Notify parent component of hover leave
  };

  // Create columns with cyclic assignment of recipes (3 columns)
  const columns = [[], [], []];
  dishes.forEach((dish, index) => {
    columns[index % 3].push(dish);
  });

  return (
    <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
      {columns.map((col, colIndex) => (
        <div className={`column column-${colIndex + 1}`} key={colIndex} style={{ width: "30%" }}>
          {colIndex === 1 && (
            <div className="top-box" style={{ marginBottom: "1px" }}>
              <h2>This is a Box at the Top of Column 2</h2>
            </div>
          )}

          {col.map((dish, postIndex) => {
            const currentIndex = `${colIndex}-${postIndex}`;
            const isHovered = hoveredDishIndex === currentIndex;
            const firstImageUrl = dish.recipeImages && dish.recipeImages[0]; // Get the first image URL

            return (
              <div
                className={`post post-${colIndex + 1} ${isHovered ? "hover" : ""}`}
                key={postIndex}
                style={{ position: "relative", marginBottom: "20px" }}
              >
                <div
                  className={`plate ${isHovered ? "hovered" : ""}`}
                  onMouseOver={() => handlePlateHover(currentIndex, dish)}
                  onMouseLeave={handlePlateLeave}
                  style={{ position: "relative", cursor: "pointer", textAlign: "center" }}
                >
                  <img
                    src={firstImageUrl || "https://via.placeholder.com/100"} // Fallback to placeholder image if no URL
                    alt={dish.recipeName}
                    style={{
                      width: "190px",
                      height: "190px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "3px solid #ddd",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      textAlign: "center",
                    }}
                  >
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Middle;
