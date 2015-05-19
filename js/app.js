var React = require('react');
var { Component } = React;
var {
  VisualStateComponent,
  VisualStateGroup,
  VisualState,
  ColorAnimation
} = require('./react-vsm');

class ExampleApp extends VisualStateComponent {
  render() {
    return (
      <div>
        <h1>App</h1>
        <div key="box" className="box">Box</div>
        <button onClick={this.handleBoxClick.bind(this)}>Make it happen</button>
      </div>
    );
  }

  getVisualStates() {
    return (
      <VisualStateGroup key="default">
        <VisualState name="one" key="one">
          <ColorAnimation target=".box" to='#AA3838' />
        </VisualState>
        <VisualState name="two" key="two">
          <ColorAnimation target=".box" to='#2E4272' />
        </VisualState>
      </VisualStateGroup>
    );
  }

  handleBoxClick() {
    this.goToState('one');
  }
}

React.render(<ExampleApp />, document.getElementById('container-root'));

module.exports = ExampleApp;
