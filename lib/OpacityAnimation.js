var VelocityAnimation = require('./VelocityAnimation');

var React = require('react');
var ReactDOM = require('react-dom');

var OpacityAnimation = React.createClass({
  displayName: 'OpacityAnimation',

  propTypes: {
    active: React.PropTypes.bool,
    component: React.PropTypes.object,
    targetRef: React.PropTypes.string.isRequired,
    to: React.PropTypes.number.isRequired
  },

  render: function () {
    return (
      <VelocityAnimation
        animProps={{ opacity: this.props.to }}
        {...this.props}
      />
    );
  },

  _getComponentTarget: function() {
    return ReactDOM.findDOMNode(this.props.component.refs[this.props.targetRef]);
  }
});

module.exports = OpacityAnimation;
