import React, { Component } from 'react';
import './App.css';
import {LandingPage, Teacher, Student} from './pages';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//import exampleJSON from './json1.json';


class App extends Component {


  render() {


    return (
      <div className="App">
        <header className="App-header">
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/'} component={LandingPage}/>
                        <Route path={'/teacher'} component={Teacher}/>
                        <Route path={'/student'} component={Student}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </header>
      </div>
    );
  }
}


export default App;
