import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
    this.setCount = this.setCount.bind(this);
  }

  setCount() {
    const { count } = this.state;
    const newCount = count + 1;
    this.setState({ count: newCount });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="App">
        <div>{count}</div>
        <button onClick={this.setCount}>Click me!</button>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
