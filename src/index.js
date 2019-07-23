import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0, value: '' };
    this.setCount = this.setCount.bind(this);
  }

  setCount() {
    const { count } = this.state;
    const newCount = count + 1;
    this.setState({ count: newCount });
  }

  render() {
    const { sayHi } = this.props;
    const { count } = this.state;

    return (
      <div className="App">
        <div>{sayHi}</div>
        <div>{count}</div>
        <input
          value={this.state.value}
          onChange={(e) => {
            this.setState({value: e.target.value});
          }}
        />
        <button onClick={this.setCount}>Click me! {count}</button>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App sayHi="Hello World" />, rootElement);
