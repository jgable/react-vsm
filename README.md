React Visual State Manager
===

This is an exploration of what a Visual State Manager implementation might look like for React.

The original inspiration is from the WPF/XAML [Visual State Manager](https://msdn.microsoft.com/en-us/library/system.windows.visualstatemanager(v=vs.110).aspx#Examples).

### An example stoplight

![react-vsm-stoplight](https://cloud.githubusercontent.com/assets/164497/12082028/3804d906-b240-11e5-9a0d-11f4d80491ed.gif)

```js
var React = require('react');
var ReactDOM = require('react-dom');
var {
  VisualStateGroup,
  VisualState,
  OpacityAnimation
} = require('../../index');

var TrafficSignal = React.createClass({
  displayName: 'TrafficSignal',

  render: function () {
    return (
      <div className="traffic-signal">
        <div className="light light-stop" ref="red" />
        <div className="light light-caution" ref="yellow" />
        <div className="light light-go" ref="green" />
        <VisualStateGroup component={this} activeState={this.props.mode}>
          <VisualState name="stop">
            <OpacityAnimation targetRef="red" to={1.0} />
          </VisualState>
          <VisualState name="caution">
            <OpacityAnimation targetRef="yellow" to={1.0} />
          </VisualState>
          <VisualState name="go">
            <OpacityAnimation targetRef="green" to={1.0} />
          </VisualState>
        </VisualStateGroup>
      </div>
    );
  }
});

var ExampleApp = React.createClass({
  displayName: 'ExampleApp',

  getInitialState: function() {
    return {
      mode: 'stop'
    };
  },

  render: function () {
    return (
      <div>
        <TrafficSignal mode={this.state.mode} />
        <button className="traffic-toggle" onClick={this._changeSignal}>Change</button>
      </div>
    );
  },

  _changeSignal: function(ev) {
    var mode = this.state.mode;
    if (mode === 'stop') {
      mode = 'go';
    } else if (mode === 'go') {
      mode = 'caution';
    } else {
      mode = 'stop';
    }

    this.setState({mode});
  }
});

ReactDOM.render(<ExampleApp />, document.getElementById('container-root'));
```

### To Run It

- Install dependencies; `npm install`
- Run dev script; `npm run dev`
- Open the demo page; `open http://localhost:8080/index.html`
