import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { finishQuiz } from '../redux/actions';
import { mapScreenSizeToProps } from '../utils/helpers';
import API from '../API/api';
import SideBar from './sidebar';
import DeleteStudent from './DeleteStudent';

var list = 'student/all/37';
var deleteMe = '';
/* Header Component */
const renderHeader = (isDesktop) => (
  <div className='header'>
    <span>Student Roster</span>
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
          this.lastState = this.state;
        }
        componentDidMount() {
          if (this.props.isActive) {
            this.props.cancelQuiz();
          }
          let currentComponent = this;
          API.get(list)
            .then(res => {
              const students = res.data;
              currentComponent.setState({ students });
              console.log(res);
              console.log(res.data);
            })
        }
        componentWillUnmount() {
        }
        onHover = () => {
          this.setState({ selection: null });

        }

        deleteStudent(event) {

          // need to add an update method to the components here
          // alert("Are you sure you want to delete "+event.target.value + "?");
          // later will add another listener for the buttons here for the ok or cancel option
          API.delete('student/delete/' + event.target.value)
            .then((res) => {
              console.log(res);
              console.log(res.data);

            });
          console.log('deleted SSID#: ' + event.target.value);

        }

        gradeLevelArray = {
        0: 'PreSchool',
        1: 'Kindegarten',
        2: '1st Grade',
        3: '2nd Grade',
        4: '3rd Grade'
        };




        render() {
          const { maxOptions, selection } = this.state;
          const { screen, quizzes } = this.props;
          const { isDesktop } = screen;
          const { students } = this.state;




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

                <div className="rosterComponent">
                  <div className="legend">
                    <span className="legendTitle_Name">Name</span>

                    <span className="legendTitle">Grade Level</span>
                    <span className="legendTitle">
                      Test <br /> Completed
              </span>
                  </div>
                  {students.map(student => (
                    <div
                      className="studentContainer"
                      key={student.studentID}
                      onMouseEnter={this.onHover}
                    >
                      <Link to="/editStudent" className={renderClassName(maxOptions)}>
                        <span className="boxWrapper">
                          <div className="scoreBox">
                            <span className="name">{student.studentName} </span>
                            <span className="gradeLevel">{this.gradeLevelArray[student.gradeLevel]}</span>
                            <span className="testCompleted">
                              {student.testCompleted}
                            </span>
                          </div>
                        </span>
                      </Link>

                      <div
                        className="buttonContainer"
                        key={student.studentID}
                        onMouseEnter={this.onHover}
                      >
                        <button
                          value={student.studentID}
                          onClick={this.deleteStudent}
                        >
                          &times;
                  </button>
                      </div>
                    </div>
                  ))}

                  <div className="studentContainer">
                    <Link
                      to="/addStudent"
                      className={renderClassName(maxOptions)}
                      onMouseEnter={this.onHover}
                    >
                      <span className="addStudent">Add Student</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }));
