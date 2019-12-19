import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { finishQuiz } from '../redux/actions';
import { mapScreenSizeToProps } from '../utils/helpers';
import API from '../API/api';
import Slider from 'react-rangeslider'
import SideBar from './sidebar'


/* Header Component */
const renderHeader = (isDesktop) => (
	<div className='header'>
		<span>Add Student</span>
	</div>
);

/* Main Quiz Selector Component */
export default connectScreenSize(
	mapScreenSizeToProps)(connect(
	state => ({
		quizzes: state.get('quizzes'),
        isActive: state.get('active'),
        students: state.get('students'),
	}), { cancelQuiz: finishQuiz })(
class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			maxOptions: this.props.quizzes.size + 1,
            userID: 37,
            studentName: 'Samwise',
            gradeLevel: 0,
            testCompleted: 0,
		}
    }

    
  onChange = (event) => {
      /*
        Because we named the inputs to match their
        corresponding values in state, it's
        super easy to update the state
      */
      this.setState({
          [event.target.name]: event.target.value
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
        const {
            userID,
            studentName,
            gradeLevel,
            testCompleted
        } = this.state;

        API.post('student/add', {userID, studentName, gradeLevel, testCompleted})
            .then((res)=> {
                console.log(res);
                console.log(res.data);
            });
    }



	onHover = () => this.setState({ selection: null });

	render() {
		const { maxOptions, selection } = this.state;
		const { screen, quizzes } = this.props;
		const { isDesktop } = screen;

		const renderClassName = (index) => {
			let css = 'title ';
			if (isDesktop) {
				if (index === selection) {
					css += 'titleHover';
				}
			}
			return css;
		};

        const {
            userID,
            studentName,
            gradeLevel,
            testCompleted
        } = this.state;

		return (
		<div>
			{renderHeader(isDesktop)}

      <div className='formWrapper'>
			<div className='formComponent'>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <form onSubmit={this.onSubmit}>
      <label>TeacherID:</label>
        <input
          type="text"
          name="userID"
          value={userID}
          onChange={this.onChange}
        />
        <br/>
        <label>Name:</label>
        <input
          type="text"
          name="studentName"
          value={studentName}
          onChange={this.onChange}
        />


         <label>Grade Level:
        <select value={this.state.gradeLevel} name="gradeLevel" onChange={this.onChange}>
            <option value="0">PK</option>
            <option value="1">K</option>
            <option value="2">1st</option>
            <option value="3">2nd</option>
             <option value="4">3nd</option>
            </select>
         </label>
         <br/>

         <label>Test Level:
        <select value={this.state.testCompleted} name="testCompleted" onChange={this.onChange}>
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
             <option value="4">5</option>
            <option value="5">6</option>
            <option value="6">7</option>
            <option value="7">8</option>
            <option value="8">9</option>
             <option value="9">10</option>
            </select>
         </label>
         <br/>
          
        <br/>
        <button type="submit">Add Student</button>
      </form>
      </div>
		</div>
	</div>
	)}
}));
