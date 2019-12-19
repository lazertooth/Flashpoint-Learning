import React from 'react';
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
		<span>Welcome to Flashpoint Study!</span>
	</div>
);

/* Main Quiz Selector Component */
export default connectScreenSize(
	mapScreenSizeToProps)(connect(
	state => ({
		quizzes: state.get('quizzes'),
		isActive: state.get('active'),
	}), { cancelQuiz: finishQuiz })(
class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			maxOptions: this.props.quizzes.size + 1,
			selection: null,
			answer: null,
		}
	}
	componentDidMount() {
		if (this.props.isActive) {
			this.props.cancelQuiz();
		}
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

		return (
		<div>
			{renderHeader(isDesktop)}
			<div className="studyWrapper">

			<SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
			<div className='studyComponent'>
				<div className='quizContainer'>
					<Link to="/quizSelection" className={renderClassName(maxOptions)} onMouseEnter={this.onHover}>
						Take a Quiz
					</Link>
	
				</div>
				
				<div className='quizContainer'>
					<Link to="/lobby" className={renderClassName(maxOptions)} onMouseEnter={this.onHover}>
						Lobby
					</Link>
				</div>
			</div>
			</div>
		</div>
	)}
}));
