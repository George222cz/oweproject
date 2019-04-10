import React, { Component } from 'react';
import './App.css';
import exampleJSON from './json1.json';
console.log(exampleJSON);

class App extends Component {

/*
    state = {
        patient: {},
    };*/
/*
    componentDidMount() {
        fetch("URL here!!!!")
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({patient: jsonResponse})
            }).catch((err) => console.error(err));
    }*/

  /*  componentDidMount() {
        this.setState({patient: exampleJSON});
    }*/

  render() {
   /*   const patient = this.state;
      console.log(patient);
      const  diagnosis = patient.diagnosis || {};*/
 /*     if(diagnosis==={}){
          return (<div><p>fck!!!</p></div>);
      }*/
    return (
      <div className="App">
        <header className="App-header">
            <h1>{exampleJSON.diagnosis}</h1>
        </header>
      </div>
    );
  }
}


export default App;
