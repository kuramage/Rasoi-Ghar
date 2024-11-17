import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sidebar from './sidebar'
import Post_content from './post_content'
import MainContent from './upload'
export class showpost extends Component {
  static propTypes = {

  }

  render() {
    return (
    //   <div >
    //     <Sidebar/>
    //     <div>
    //     <Post_content style={{border:"2px solid black"}} />
    //     </div>
       
    //   </div>
    <div className="flex h-screen">
      <Sidebar isUploadActive={true} />
      <div
        style={{
          width: "82.67vw",
          position: "relative",
          left: "250px",
        //   display: "flex",
        //   justifyContent: "center",
        }}
      >
        <Post_content 
          
        />
        </div>
    </div>
    )
  }
}

export default showpost
