import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';
import Post_content from './post_content';
import { useLocation } from 'react-router-dom';

// Functional component to handle location and pass props to Post_content
const PostContent = () => {
  const location = useLocation();
  const { dishName, description, images, recipeId } = location.state || {};

  return (
    <div className="post-content-container">
      {/* Render content or display a fallback if data is not available */}
      {dishName ? (
        <Post_content
          dishName={dishName}
          description={description}
          images={images}
          recipeId={recipeId}
        />
      ) : (
        <p>No post content available. Please navigate here from a valid post.</p>
      )}
    </div>
  );
};

class ShowPost extends Component {
  render() {
    return (
      <div className="flex h-screen">
        {/* Sidebar Component */}
        <Sidebar isUploadActive={true} />

        {/* Main Content Area */}
        <div
          style={{
            width: '82.67vw',
            position: 'relative',
            left: '250px',
          }}
        >
          {/* Render the functional PostContent component */}
          <PostContent />
        </div>
      </div>
    );
  }
}

ShowPost.propTypes = {
  // Add prop types if necessary
};

export default ShowPost;
