import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageSlider from './imageslider';
import chole1 from './chole/chole_1.jpg';
import chole2 from './chole/chole_2.jpg';
import chole3 from './chole/chole_3.jpg';
export class post_content extends Component {
  static propTypes = {

  }

  render() {

    const stepsData = [
        { id: 1, title: "1. chole ubal lein ...", image: chole1 },
        { id: 2, title: "2. chole bana lein", image: chole2 },
        { id: 3, title: "3. tel garam", image: chole3 },
        { id: 4, title: "4. atta taiyaar ...", image: chole1 },
        { id: 5, title: "5. step description ...", image: chole2 },
        { id: 3, title: "3. tel garam", image: chole3 },
        { id: 4, title: "4. atta taiyaar ...", image: chole1 },
        { id: 5, title: "5. step description ...", image: chole2 },
         { id: 3, title: "3. tel garam", image: chole3 },
        { id: 4, title: "4. atta taiyaar ...", image: chole1 },
        
        // Add more steps as needed
      ];
    return (
        <div className="chole-puri-container" style={{height:"99vh"}}>

        <div className="post-open-middle" style={{display:"flex",height:"55vh",marginBottom:"10px"}}>
        <div className="post-photos" style={{width:"100vw"}}>
        <div className="carousel">
          {/* <button className="carousel-button" style={{position:"relative",left:"0px"}}>{"<"}</button> */}
          {/* <div className="carousel-slide">
            <img src="your-image-path" alt="Chole Puri" className="carousel-image" />
          </div> */}
          <ImageSlider />
          {/* <button className="carousel-button">{">"}</button> */}
        </div>
            <div className="jetbrains-mono tags-container">
            <div className="tags">
                <div className="tag">veg</div>
                <div className="tag">spicy</div>
                <div className="tag">festive</div>
                <div className="tag">veg</div>
                <div className="tag">spicy</div>
                <div className="tag">festive</div>
            </div>
            </div>
        </div>
  
        <div className="details" style={{display:"flex",flexDirection:"column"}}>
          <h2 style={{ fontFamily: 'Istok Web, sans-serif',fontSize:"60px" }} >Chole Puri</h2>
          
          <div className="interaction" style={{display:"flex",justifyContent:"space-between",marginBottom:"20px"}}>
            <span className="like" style={{fontSize:"30px"}}>❤️ 56</span>
            <button className="button" style={{height:"8vh",width:"20vw",fontSize:"30px",color:"black",position:"relative",left:"-120px"}}>let's cook 🧑‍🍳</button>
            </div>
          <div style={{fontFamily: 'Istok Web, sans-serif',fontSize:"24px"}}>
          <p>
            Chole puri is a popular North Indian dish featuring a chickpea curry
            flavored with an aromatic mix of spices (chole) and served with deep-fried bread (puri).
            Instead of traditional deep-frying, we opt for a healthier approach by air-frying the puris.
          </p>
          
          </div>
        </div>

          
  
         
        </div>
        <div className="step-heading" style={{display:"flex"}}>
        <hr style={{ border: "none", borderBottom: "4px solid grey", margin: "0", width: "38vw"}} />
        <span className='jetbrains-mono' style={{margin:"0px 40px 0px 50px",fontSize:"25px",position:"relative",top:"-17px",color:"grey"}}>Steps </span>
        <hr style={{ border: "none", borderBottom: "4px solid grey", margin: "0", width: "40vw"}} />
        
        </div>
        {/* <hr />
  
        <div className="steps-title" style={{border:"2px solid pink"}}>steps</div> */}
       <div className="steps">
  {stepsData.map((step) => (
    <div className="step" key={step.id}>
      <img src={step.image} alt={`Step ${step.id}`} className="step-image" />
      <div className="step-text">
        <span>{step.title}</span>
      </div>
    </div>
  ))}
</div>
  
      </div>
    )
  }
}

export default post_content
