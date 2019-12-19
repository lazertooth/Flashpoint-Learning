import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { finishQuiz } from '../redux/actions';
import { mapScreenSizeToProps } from '../utils/helpers';
import SideBar from './sidebar'

/* Header Component */
const renderHeader = (isDesktop) => (
	<div className='header'>
		<span>🔥 -- Select a Quiz:</span>
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

	onHover = () => this.setState({ selection: null });

	render() {
		const { maxOptions, selection } = this.state;
		const { screen, quizzes } = this.props;
		const { isDesktop } = screen;
		const totalQuestions = quizzes.reduce((t, q) => {
			return t + q.get('challenges').size;
		}, 0);
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
	

			<div className='studyWrapper'>
					<SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />	

					
						<div className='studyComponent'>
						
							{quizzes.map((quiz, index) => {
								const title = quiz.get('title').replace(/\s/g, '-');
								const challenges = quiz.get('challenges');
								return (					
									<div key={title} className='quizContainer'>
										{/* We could limit the review link to development with this:
										 * process.env.NODE_ENV === 'development' */}
			
										<Link className='review' to={`/review/${title}`} title='Review All Questions'>
											<i className='fa fa-search'></i>
										</Link>
										<Link to={`/practice/${title}`} className={renderClassName(index)} onMouseEnter={this.onHover}>
											{quiz.get("title")} <span>({challenges.size} questions)</span>
										</Link>
									</div>
								)
							})}

{/*
						<div className='quizContainer'>
							<Link to='practice/shuffle' className={renderClassName(maxOptions - 1)} onMouseEnter={this.onHover}>
								Shuffle All Quizzes <span>({totalQuestions} questions)</span>
							</Link>
						</div>
*/}
					</div>
				</div>
			</div>
		)
	}
}));
