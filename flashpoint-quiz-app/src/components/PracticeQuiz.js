import React from 'react';
import Prism from 'prismjs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createScoreMeter, setHtmlMetadata } from '../utils/helpers';
import SideBar from "./sidebar";
import Speech from "react-speech";

/* Practice Quiz Component, this component is responsible
 * for handling each question in a quiz session */
export default class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			complete: false,
			selection: null,
			answer: null,
		}
	}

	

	componentDidMount() {
		const id = this.props.meta.getIn(['currentQuestion', 'id']);
		setHtmlMetadata(id);
		Prism.highlightAll();
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.meta !== nextProps.meta) {
			const id = nextProps.meta.getIn(['currentQuestion', 'id']);
			setHtmlMetadata(id);
		}
	}
	componentDidUpdate() {
		Prism.highlightAll();
	}
	onHover = () => this.setState({ selection: null });

	handleAnswer = (choice, solution) => {
		if (choice === solution) {
			this.setState({
				answer: true,
				selection: null,
			});
		} else {
			this.setState({
				answer: false,
				selection: null
			});
		}
	}
	nextQuestion = () => {
		const { meta, title } = this.props;
		const index = meta.get('index');
		const length = meta.getIn(['quiz', 'challenges']).size;
		if (this.state.answer){ 
			this.props.correct();
		}
		if (index === length - 1) {
			this.props.viewResults();
			this.setState({ complete: true });
		} else {
			this.props.nextQuestion();
			const nextTitle = meta
				.getIn(['quiz', 'challenges'])
				.find((v, k) => k === (index + 1))
				.get('id')
				.replace(/\s/g, '-');
			this.props.history.replace(`/practice/${title.replace(/\s/g, '-')}/${nextTitle}`);
			this.setState({
				answer: null,
				selection: null
			});
		}
	}
	renderMarkup = (html) => {
		return (
			<span dangerouslySetInnerHTML={{__html: html}}></span>
		);
	}

	

	render() {
		const { selection, answer, complete } = this.state;
		const { meta, screen } = this.props;
		const { isMobile, isDesktop } = screen;
		const quiz = meta.get('quiz');
		const score = meta.get('score');
		const index = meta.get('index');
		const numberOfQuestions = quiz.get('challenges').size;
		const currentQuestion = meta.get('currentQuestion');
		const solution = +currentQuestion.get('solution');
		const percentage = score / meta.getIn(['quiz', 'challenges']).size;
		const renderClassName = (i) => {
			return (selection === i)
				? `choice selected ${isMobile ? 'mobile' : 'desktop'}`
				: `choice ${isMobile ? 'mobile' : 'desktop'}`;
		};

		const tower = createScoreMeter(score, index, numberOfQuestions);
		const widthPercentage = (100 / numberOfQuestions);
		
		/* if question is answered, post question results to db */
		if (answer !== null && !this.state.complete) {
			/* TODO: get correct values for studentID, testID, correctWord */
			const sID = '40';		// temp placeholder
			const tID = '07'; 		// temp placeholder
			const testNum = '007';	// temp placeholder
			const choices = currentQuestion.get('choices').toArray();
			const correctWord = choices[solution];
			const questionResultsData = {
					studentID : sID,
					testID: tID,
					gradeLevel: this.props.title,
					testNum: testNum,
					correctWord: correctWord,
					gotRight: answer
			}
			/* add student's question results to db */
			axios.post(`http://flashpoint.us-west-1.elasticbeanstalk.com/test/word/add/`, questionResultsData);
		}
		
		const passedTest = percentage >= 0.75 ? true : false;
		/* if test is complete, post overall test results to db */
		if (this.state.complete && passedTest) {
			/* TODO: get correct values for studentID, userID, testNum */
			const sID = '40';		// temp placeholder
			const uID = '37';		// temp placeholder
			const testNum = '007';	// temp placeholder
			const testResultsData = {
					studentID: sID,
					userID: uID,
					gradeLevel: this.props.title,
					testNum: testNum,
					success: passedTest
			}
			/* update the student's most recent test passed */
			axios.get(`http://flashpoint.us-west-1.elasticbeanstalk.com/student/update/${sID}/test/${testNum}`);
			/* add student's final test results to db */
			axios.post(`http://flashpoint.us-west-1.elasticbeanstalk.com/test/add`, testResultsData);
		}
				
		return (
      <div className="studyWrapper">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <div className="studyContainer">
          <div id="score-tower">
            {tower.map((type, i) => (
              <div
                className={type}
                key={quiz.get("challenges").find((v, k) => k === i)}
                style={{ width: `${widthPercentage}%` }}
              ></div>
            ))}
          </div>

          <div className="quizHeader">
            <div className="quizTitle">
              <span>{quiz.get("title")} Quiz</span>
              <span
                style={{ marginLeft: 10 }}
                role="img"
                aria-label="quiz-icon"
              >
                📕
              </span>
            </div>
            {!this.state.complete ? (
              <h3 className="quizMeta">
                Question {index + 1} of {numberOfQuestions}
              </h3>
            ) : (
              <h3 className="quizMeta">Quiz Complete</h3>
            )}
            {isDesktop && (
              <span id="return">
                <Link to="/quizSelection">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </Link>
              </span>
            )}
          </div>

          {!complete && (
            <h1 className="questionTitle">
              
              <Speech
                text={currentQuestion.get("title")}
                pitch="3"
                rate=".7"
				voice="Karen"
				
              />
            </h1>
          )}

          {!complete &&
            currentQuestion.get("choices").map((choice, idx) => {
              const key = choice + idx;
              /* User has not selected an answer yet: */
              if (answer === null) {
                return (
                  <div
                    key={key}
                    className={renderClassName(idx)}
                    onMouseEnter={this.onHover}
                    onClick={() => this.handleAnswer(idx, solution)}
                  >
                    <p>{this.renderMarkup(choice)}</p>
                  </div>
                );
                /* User selected the correct answer: */
              } else if (answer) {
                /* draw correct answer in green, incorrect answers in gray */
                if (solution === idx) {
                  return (
                    <div key={key} className="choice" id="correctWinner">
                      <p>{this.renderMarkup(choice)}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="choice" id="wrongWinner">
                      <p>{this.renderMarkup(choice)}</p>
                    </div>
                  );
                }
                /* User selected the wrong answer: */
              } else {
                /* draw correct answer in green, incorrect answers in red */
                if (solution === idx) {
                  return (
                    <div key={key} className="choice" id="correctLoser">
                      <p>{this.renderMarkup(choice)}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="choice" id="wrongLoser">
                      <p>{this.renderMarkup(choice)}</p>
                    </div>
                  );
                }
              }
            })}

          {/* if question is answered, display correct/incorrect and a button to next question */}
          {answer !== null && !complete && (
            <div className="messageDiv">
              {/* display msg for correct / incorrect guess */}
              {answer ? (
                <h1 className="correctAnswer">Correct, great work!</h1>
              ) : (
                <h1 className="wrongAnswer">Sorry, that is not correct!</h1>
              )}

              {/* if last question, display view results button; otherwise next question button */}
              {index + 1 === numberOfQuestions ? (
                <button onClick={this.nextQuestion}>View Results</button>
              ) : (
                <button onClick={this.nextQuestion}>Next Question</button>
              )}
            </div>
          )}

          {/* if test is complete, display test score and say if they passed the test */}
          {complete && (
            <div>
              <h1 className="scoreMessage">
                You scored {score} correct out of {numberOfQuestions} questions!
                {percentage >= 0.75
                  ? " Nice work, you passed the quiz!"
                  : " Try again - Better luck next time!"}
              </h1>
              <Link
                className="finishBtn"
                to="/quizSelection"
                onClick={() => this.props.finishQuiz()}
              >
                <button>Return to Quiz Page</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
	}
};
