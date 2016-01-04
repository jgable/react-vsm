var VelocityAnimation = require('./VelocityAnimation');

var React = require('react');
var ReactDOM = require('react-dom');
var velocity = require('velocity-animate');

var OpacityAnimation = React.createClass({
  displayName: 'OpacityAnimation',

  propTypes: {
    active: React.PropTypes.bool,
    component: React.PropTypes.object,
    from: React.PropTypes.number,
    targetRef: React.PropTypes.string.isRequired,
    to: React.PropTypes.number.isRequired
  },

  componentDidMount: function() {
    // Defer this because the window.getComputedStyle() is potentially expensive
    window.requestAnimationFrame(() => {
      this._setInitialOpacity();
      if (this.props.active) {
        this._animateTo(this.props.to);
      }
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.active === this.props.active && nextProps.to === this.props.to) {
      return;
    }

    if (nextProps.active) {
      this._animateTo(nextProps.to);
    } else {
      this._animateTo(nextProps.from || this.initialOpacity || 0);
    }
  },

  render: function () {
    return (
      <noscript></noscript>
    );
  },

  _setInitialOpacity: function() {
    var target = this._getComponentTarget();
    if (target) {
      var style = window.getComputedStyle(target);
      var parsedOpacity = parseFloat(style.getPropertyValue('opacity'), 10);
      this.initialOpacity = isNaN(parsedOpacity) ? 0 : parsedOpacity;
    } else {
      this.initialOpacity = 0;
    }
  },

  _animateTo: function(to) {
    var target = this._getComponentTarget();
    velocity(target, { opacity: to }, {
      delay: this.props.delay,
      duration: this.props.duration,
      easing: this.props.easing,
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

module.exports = OpacityAnimation;
