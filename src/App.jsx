import React, { Component } from "react";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import Middle from "./components/middle";
import Home from "./components/home.jsx";
import Content from "./components/content";
// import Login from "./components/login";
import { div } from "framer-motion/client";
import MainContent from "./components/upload";
import StepsPanel from "./components/Panel";
import UploadPost from "./components/upload_post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/signin.jsx";
import Showpost from "./components/showpost.jsx";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dishName: "Dal Makhni", // Shared state
  //     description:
  //       "Dal makhani is an Indian dish originating in Delhi. A relatively modern variation of traditional lentil dishes, it is made with urad dal and other pulses, and includes butter and cream.Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officia debitis, maxime ut omnis ipsum at ipsa cumque, odit dolore quam sint!",
  //     isHovered: false, // Hover state
  //   };
  // }

  // // Method to update dishName and description
  // updateDish = (newDishName) => {
  //   this.setState({ dishName: newDishName });
  // };

  // // Method to update hover state
  // updateHoverState = (hoverState) => {
  //   this.setState({ isHovered: hoverState });
  // };

  render() {
    return (

      // <Home/>

      //       <div className="main" >
      //  <Login/>
      //       </div>

      // <div className='containeer' style={{ display: "flex" }}>
      // <div className="slide">
      //   <Sidebar />
      // </div>

      //   <div className="middle" style={{ width: "60vw", position: "relative", left: "250px", display: "flex", justifyContent: "center" }}>
      //     {/* Pass the hoverState, dishName, description, and update methods to Middle */}
      //     <Middle
      //       dishName={this.state.dishName}
      //       description={this.state.description}
      //       updateDish={this.updateDish}
      //       updateHoverState={this.updateHoverState}  // Pass hoverState update function
      //     />
      //   </div>

      //   <div style={{ width: "5vw", position: "relative", left: "247px" }}>
      //     {/* Pass the hoverState and dishName to Content */}
      //     <Content
      //       dishName={this.state.dishName}
      //       description={this.state.description}
      //       isHovered={this.state.isHovered}  // Pass hover state
      //     />
      //   </div>
      // </div>
      
        <div className="flex h-screen">
          {/* <Home></Home> */}
          
        <Showpost/> 
        {/* <SignIn></SignIn> */}
      </div>

      
    );
  }
}


// function App() {
//   return (
//     <BrowserRouter>
//       <div className="app">
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;
