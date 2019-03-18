import React from 'react';
import './App.css';
import Display from './components/Display';
import Buttons from './components/Buttons';
import Button from './components/Button';
import update from 'immutability-helper';
//https://github.com/kolodny/immutability-helper
import math from 'mathjs';

class App extends React.Component {
  constructor() {
    super();
    this.state = { operations: [] };
  }

  handleClick = e => {
    const value = e.target.getAttribute("data-value");
    switch (value) {
      case "clear":
        this.setState({ operations: [] });
        break;
      case "equal":
        this.calculateOperations();
        break;
      default:
        const newOperations = update(this.state.operations, {
          $push: [value],
        });
        this.setState({
          operations: newOperations,
        });
        break;
    }
  }

  calculateOperations = () => {
    let result = this.state.operations.join('');
    //If anything exists in the array, the string is evaluated with math.eval.
    //mathjs has it’s own eval function which only parses mathematical expressions.
    if (result) {
      result = math.eval(result);
      //formatting: There’s a fundamental issue with the arithmetic in JavaScript. There’s only one type of number, unlike other languages. It has very high precision, it doesn’t care how many you’re actually using.
      result = math.format(result, { precision: 14 });
      result = String(result);
      //Then we set the state to the result so that the display gets updated.
      this.setState({
        operations: [result]
      });
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="app">
          {/* The Display component takes the state.operations to display input and result */}
          <Display data={this.state.operations}/>
          <Buttons>
            <div className="column">
              <Button onClick={this.handleClick} label="7" value="7" />
              <Button onClick={this.handleClick} label="4" value="4" />
              <Button onClick={this.handleClick} label="1" value="1" />
              <Button onClick={this.handleClick} label="0" value="0" />
            </div>
            <div className="column">
              <Button onClick={this.handleClick} label="8" value="8" />
              <Button onClick={this.handleClick} label="5" value="5" />
              <Button onClick={this.handleClick} label="2" value="2" />
              <Button onClick={this.handleClick} label="." value="." />
            </div>
            <div className="column">
              <Button onClick={this.handleClick} label="9" value="9" />
              <Button onClick={this.handleClick} label="6" value="6" />
              <Button onClick={this.handleClick} label="3" value="3" />
              <Button onClick={this.handleClick} label="=" value="equal" />
            </div>
            <div className="column">
              <Button onClick={this.handleClick} label="/" value="/" />
              <Button onClick={this.handleClick} label="*" value="*" />
              <Button onClick={this.handleClick} label="+" value="+" />
              <Button onClick={this.handleClick} label="-" value="-" />
            </div>
            <div className="column">
              <Button onClick={this.handleClick} label="C" value="clear" />
            </div>
            </Buttons>
        </div>
      </div>
    )
  }
}

// TODO: There are a few pitfalls though, the expression has to be valid. Something like 2*/5 will crash the app. Expression 2.4.5 + 1 will also crash the app. This is a logical side (pure JavaScript logic) of the app and has nothing to do with the react.
// It can be solved by having conditional statements in the handleClick before updating the operations with newOperations to check invalid operators(2 * /) or a decimal (.). 

export default App;
