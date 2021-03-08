import React, { Component } from 'react';
class App extends Component {
  state = {
    test: true,
  };
  handleClick = () => {
    this.setState({
      test: !this.state.test,
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        {this.state.test && <p>Conditional Rendering Is Cool!</p>}
      </div>
    );
  }
}
export default App;
