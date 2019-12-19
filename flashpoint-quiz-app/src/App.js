import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import QuizSelection from './components/QuizSelection'
import Review from './components/ReviewQuiz';
import About from './components/About';
import QuizContainer from './components/QuizContainer';
import Home from './components/Home';
import Roster from './components/Roster';
import AddStudent from './components/AddStudent';
import DeleteStudent from './components/DeleteStudent';
import LoginPage from './components/LoginPage';
import Lobby from './components/Lobby';
import Settings from './components/Settings';

/* top level component renders the App's routes */
/* this uses React and Redux to simplify the routes and state */

export default class extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={LoginPage} />
          <Route path='/practice/:title/:question' component={QuizContainer} />
          <Route path='/practice/:title' component={QuizContainer} />
          <Route path='/review/:title' component={Review} />
          <Route exact path='/about' component={About} />
          <Route exact path='/addStudent' component={AddStudent} />
          <Route exact path='/deleteStudent' component={DeleteStudent} />
          <Route path='/quizSelection' component={QuizSelection} />
          <Route path='/roster' component={Roster} />
          <Route path='/login' component={LoginPage} />
          <Route path='/home' component={Home} />
          <Route path='/lobby' component={Lobby} />
          <Route path='/settings' component={Settings} />
          <Route component={LoginPage} />
        </Switch>
      </Router>
    )
  }
};

