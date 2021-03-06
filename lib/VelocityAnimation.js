var React = require('react');
var ReactDOM = require('react-dom');
var velocity = require('velocity-animate');

var VelocityAnimation = React.createClass({
  displayName: 'VelocityAnimation',

  propTypes: {
    active: React.PropTypes.bool,
    animProps: React.PropTypes.object,
    component: React.PropTypes.object,
    targetRef: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {
    if (this.props.active) {
      // Defer this so that the computedStyle is correct for reversing
      window.requestAnimationFrame(() => {
        this._animateTo();
      });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    // TODO: More exhaustive checking
    if (nextProps.active === this.props.active) {
      return;
    }

    if (nextProps.active) {
      this._animateTo();
    } else {
      this._animateFrom();
    }
  },

  render: function () {
    return <noscript />;
  },

  _animateTo: function() {
    var target = this._getComponentTarget();
    var {delay, duration, easing} = this.props;

    velocity(target, this.props.animProps, {
      delay,
      duration,
      easing,
      begin: () => {
        if (this.props.onBegin) {
          this.props.onBegin();
        }
      },
      complete: () => {
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    });
  },

  _animateFrom: function() {
    var target = this._getComponentTarget();
    var {delay, duration, easing} = this.props;

    velocity(target, 'reverse', this.props.animProps, {
      delay,
      duration,
      easing,
      begin: () => {
        if (this.props.onBegin) {
          this.props.onBegin();
        }
      },
      complete: () => {
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    });
  },

  _getComponentTarget: function() {
    return ReactDOM.findDOMNode(this.props.component.refs[this.props.targetRef]);
  }
});

module.exports = VelocityAnimation;
