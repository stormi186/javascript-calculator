import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      result: '',
      state: '',
      prevOperator: ''
    } 
    this.handleClick = this.handleClick.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.checkPrevious = this.checkPrevious.bind(this);
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.calculateNum = this.calculateNum.bind(this);
  }
  
  handleClick(e) {
    switch(e.target.value) {
      case 'all-clear':
        this.clearDisplay();
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (this.state.result === "0" && e.target.value==="0")
          break;
        if (this.state.display === "0" || this.state.prevOperator === '=') {
          this.setState({
            result: this.state.result.concat(e.target.value),
            display: this.state.result.slice(0, -1).concat(e.target.value),
            prevOperator: ''
          });
        }
        else {
          if ((this.state.result.length+1)>23) {
            this.maxDigitWarning();
          }
          else {
            if (this.state.result === "0"){
              this.setState({
                result: e.target.value,
                display: this.state.display.slice(0, -1).concat(e.target.value)
                });
            }
            else {
              this.setState({
                result: this.state.result.concat(e.target.value),
                display: this.state.display.concat(e.target.value)
                });
            }
          }
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if(this.state.prevOperator === '=') {
          this.setState({
            prevOperator: ''
          })
        }
        if(!this.checkPrevious(e.target.value)) {
          let i = this.state.display.slice(-1);
          if (i==='+' || i==='-' || i==='*' || i==='/') {
            let newDisplay = this.state.display.slice(0, -1).concat(e.target.value);
            this.setState({
              display: newDisplay
            });
          }
          else {
            this.setState({
            display: this.state.display.concat(e.target.value)
    });
          }
        }
        this.setState({
          result: ''
        });
        break;
      case '.':
        let a = this.state.result.match(/\./g);
        if (a === null){
          if (this.state.result===''){
          this.setState({
              result: this.state.result.concat("0."),
              display: this.state.display.slice(0, -1).concat("0.")
            });  
            console.log(this.state.result);
          }
          else {
            this.setState({
              result: this.state.result.concat(e.target.value),
              display: this.state.display.concat(e.target.value)
            });
          }
        }
        break;
      case '=':
        let formula = this.state.display;
        let c = formula.slice(-1);
        if (!(c >= '0' && c <= '9')){
          formula = formula.slice(0, -1);
          this.setState({
            display: formula
          });
        }
        this.calculateNum(formula);
        break;
      default:
    }
  }
  
  calculateNum(formula) {
        let num = eval(formula).toString();
        this.setState({
          display: num,
          result: '',
          prevOperator: '='
        });
  }
  
  maxDigitWarning() {
    this.setState({
      result: 'MAX DIGITS',
      store: this.state.result
    });
    setTimeout(() => this.setState({result: this.state.store}), 1000);
  }
  
  clearDisplay() {
    this.setState({
      display: '0',
      result: '',
      state: '',
      prevOperator: ''
    });
  }
  
  checkPrevious(symbol) {
    if (symbol === this.state.display.slice(-1)) {
      return true;
    }
    else {
      return false;
    }
  }
  
  render() {
    return (
      <div id="calculator">
        <div className="calculator-screen">
        <div id="display">{this.state.display}</div>
        <div id="result">{this.state.result}</div>
        </div>
        <div className="calculator-keys">
     
          <button value="all-clear" id="clear" onClick={this.handleClick}>AC</button>
          <button className="operator" id="divide" value="/" onClick={this.handleClick}>&divide;</button>
          <button className="operator" id="multiply" value="*" onClick={this.handleClick}>&times;</button>
          
          <button value="7" id="seven" onClick={this.handleClick}>7</button>
          <button value="8" id="eight" onClick={this.handleClick}>8</button>
          <button value="9" id="nine" onClick={this.handleClick}>9</button>
          <button className="operator" id="subtract" value="-" onClick={this.handleClick}>-</button>
          
          <button value="4" id="four" onClick={this.handleClick}>4</button>
          <button value="5" id="five" onClick={this.handleClick}>5</button>
          <button value="6" id="six" onClick={this.handleClick}>6</button>
          <button className="operator" id="add" value="+" onClick={this.handleClick}>+</button>
          
          <button value="1" id="one" onClick={this.handleClick}>1</button>
          <button value="2" id="two" onClick={this.handleClick}>2</button>
          <button value="3" id="three" onClick={this.handleClick}>3</button>
          
          <button value="=" id="equals" onClick={this.handleClick}>=</button>
          <button value="0" id="zero" onClick={this.handleClick}>0</button>
          <button value="." id="decimal" onClick={this.handleClick}>.</button>
          
        </div>
        </div>
    );
  }
}
