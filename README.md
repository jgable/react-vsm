React Visual State Manager
===

This is an exploration of what a Visual State Manager implementation might look like for React.

Read more about the WPF/XAML [Visual State Manager](https://msdn.microsoft.com/en-us/library/system.windows.visualstatemanager(v=vs.110).aspx#Examples) from MSDN docs.

### This is the goal

```js
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
      <VisualStateGroup name="default">
        <VisualState name="one">
          <ColorAnimation target=".box" to='#AA3838' />
        </VisualState>
        <VisualState name="two">
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
```

### To Run It

- Install webpack; `npm install webpack -g`
- Install dependencies; `npm install`
- Run dev script; `npm run dev`