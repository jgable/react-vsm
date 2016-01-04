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

module.exports = ExampleApp;
