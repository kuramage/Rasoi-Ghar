import React, { Component } from "react";
import Sidebar from "./sidebar";
import MainContent from "./upload";
import StepsPanel from "./panel";

export class UploadPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "untitled",
      stepNumber: 1,
      steps: [], // To store steps data
      currentStepIndex: null, // To manage which step is active
    };
  }

  handleTitleChange = (newTitle) => {
    this.setState({ title: newTitle });
  };

  addStep = (stepData) => {
    this.setState((prevState) => ({
      steps: [...prevState.steps, stepData],
      stepNumber: prevState.steps.length + 1, // Update step number
      currentStepIndex: prevState.steps.length, // Set new step as active
    }));
  };

  selectStep = (index) => {
    this.setState({ currentStepIndex: index });
  };

  render() {
    const { title, stepNumber, steps, currentStepIndex } = this.state;
    const currentStepData = steps[currentStepIndex] || {}; // Default to empty if no step selected

    return (
      <div className="flex h-screen">
        <Sidebar />
        <div
          style={{
            width: "82.67vw",
            position: "relative",
            left: "250px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MainContent
            title={title}
            onTitleChange={this.handleTitleChange}
            onAddStep={this.addStep}
            {...currentStepData}
          />
          <StepsPanel
            title={title}
            stepNumber={stepNumber}
            steps={steps}
            onAddStep={this.addStep} // Pass addStep function to StepsPanel
            onSelectStep={this.selectStep}
          />
        </div>
      </div>
    );
  }
}

export default UploadPost;
