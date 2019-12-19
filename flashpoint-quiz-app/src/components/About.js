import React from 'react';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { mapScreenSizeToProps } from '../utils/helpers';

import SideBar from "./sidebar";
import csusLogo from "../assets/images/csus_logo.png";

/* Header Component */
const renderHeader = (isDesktop) => (
	<div className='header'>
		<span>About This Project</span>
	</div>
);


/* About Component */
export default connectScreenSize(mapScreenSizeToProps)(
class About extends React.Component {
	render() {
		const { screen } = this.props;
		const { isDesktop } = screen;
		return (
      <div>
        {renderHeader(isDesktop)}
        <div className="studyWrapper">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div className="studyComponent">
            <div className="about">
              <h1>Flashpoint SightWords</h1>
              <p>
                Version 0.4b
                <br/>
                Created by 
				<h5><b>Team Flashpoint</b></h5> 
				Senior Project -- Fall 2019
				<br/>
              	<img src={csusLogo} alt="logo" />
				  <br/>
              
                Intended to aid educators in teaching
                "sight words"
              </p>
            </div>
            <Link className="finishBtn" to="/Home">
              <button>Done</button>
            </Link>
          </div>
        </div>
      </div>
    );
	}
});
