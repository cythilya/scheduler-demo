import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  unstable_runWithPriority,
  unstable_scheduleCallback,
  unstable_ImmediatePriority,
  unstable_LowPriority,
} from 'scheduler';

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

    this.doSecond();
    this.doFirst(); // top priority!
    this.doSecond();
    this.doSecond();
    this.doSecond();
    this.doSecond();
  }

  doFirst() {
    unstable_runWithPriority(unstable_ImmediatePriority, () => {
      unstable_scheduleCallback(() => {
        console.log('first');
      });
    });
  }

  doSecond() {
    unstable_runWithPriority(unstable_LowPriority, () => {
      unstable_scheduleCallback(() => {
        console.log('secoed');
      });
    });
  }

  render() {
    const { count } = this.state;

    return (
      <div className="App">
        <div>{count}</div>
        <button onClick={this.setCount}>Click me! {count}</button>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App sayHi="Hello World" />, rootElement);
