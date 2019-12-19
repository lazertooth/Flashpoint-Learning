import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { finishQuiz } from '../redux/actions';
import { mapScreenSizeToProps } from '../utils/helpers';
import API from '../API/api';
import SideBar from './sidebar';

/* Header Component */
const renderHeader = (isDesktop) => (
	<div className='header'>
		<span>Delete Student</span>
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
      studentID: '',
		}
    }

    
  onChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
        const {
            studentID,
        } = this.state;


        API.delete('student/delete/' + studentID)
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
            studentID,
        } = this.state;

		return (
		<div>
		<div>
			{renderHeader(isDesktop)}

      <div className='formWrapper'>
			<div className='formComponent'>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <form onSubmit={this.onSubmit}>
      <label>Student ID:</label>
        <input
          type="text"
          name="studentID"
          value={studentID}
          onChange={this.onChange}
        />
        <br/>

        <br/>
        <button type="submit" value="Submit">Delete Student</button>
      </form>
		</div>
	</div>
  </div>
  </div>
	)}
}));
