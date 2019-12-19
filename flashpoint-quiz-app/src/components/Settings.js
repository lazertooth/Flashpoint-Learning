import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { finishQuiz } from '../redux/actions';
import { mapScreenSizeToProps } from '../utils/helpers';
import API from '../API/api';
import SideBar from './sidebar';

var list = 'student/all/37';
/* Header Component */
const renderHeader = (isDesktop) => (
	<div className='header'>
		<span>Account Settings -- WIP Test Only</span>
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
			selection: null,
            answer: null,
            students: [],
		}
	}
	componentDidMount() {
		if (this.props.isActive) {
			this.props.cancelQuiz();
        }
                   API.get(list)
                  .then(res => {
                      const students = res.data;
                      this.setState({students});
                      console.log(res);
                      console.log(res.data);
                  })
	}
	componentWillUnmount() {
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
		
		/* get all students belonging to user */
		//userID = "";
		//axios.get(`http://flashpoint.us-west-1.elasticbeanstalk.com/student/all/${userID}`)

		return (
		<div>
			{renderHeader(isDesktop)}
	

			<div className='studyWrapper'>
					<SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />	

					
						<div className='studyComponent'>
                {this.state.students.map(student => 
				<div className='quizContainer' key={student.studentID} onMouseEnter={this.onHover}>
					<Link to="/editStudent" className={renderClassName(maxOptions)} >
						<span>{student.studentName} </span>
						<span>{student.gradeLevel}</span>
						<span>{student.testCompleted}</span>
					</Link>
				</div>)}

			</div>
		</div>
		</div>
	)}
}));
