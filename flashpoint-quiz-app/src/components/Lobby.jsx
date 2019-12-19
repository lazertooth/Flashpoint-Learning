import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class Lobby extends React.Component{
constructor(props){
	super(props)

	this.state = {
		numWords: 0,
		level: 0,
		students: []
	}

}

  handleOnChange = (value) => {
    this.setState({
	  numWords: value,
		level: value
    })
  }









	render(){

	
		let students = [
  					'James','Derrek','Ian','Matt','Aman','Alex'
						];

		let {numWords } = this.state;
		let {level} = this.state;
		
		//const defaultOption = options[0];
		return(

			<div className = "halfWidth">
		<br/>
		<h1>Number of Words</h1>
      <Slider
        value={numWords}
        orientation="horizontal"
        onChange={this.handleOnChange}
		min={3}
		max={6}
		labels={{0: "3", 100:"6"}}
		
		
		
		/>
			<br/>	
				<form action="/UserSelection"> 
				<h1> Student List </h1>

		  <Dropdown options={students} onChange={this._onSelect} placeholder="Select a student"/> 
			<br/>
			 				 <button type="submit" style={{color: "lightblue", position: "relative", width: "20%", bottom: "10%",  }}>Start</button>
				</form>

					<div className="floatLeft">
						<h2>Level</h2>
					      <Slider
        					value={level}
       						 orientation="vertical"
       						 onChange={this.handleOnChange}
							min={1}
							max={10}
							labels={{0: "1", 100:"10"}}
		
		
		
		/>

					</div>
			</div>

			

			

		);
	}



}
export default Lobby;