var React = require('react');

var VisualState = React.createClass({
  displayName: 'VisualState',

  propTypes: {
    component: React.PropTypes.object,
    active: React.PropTypes.bool
  },

  render: function () {
    var animations = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        component: this.props.component,
        active: this.props.active
      });
    });
    return <noscript>{animations}</noscript>;
  }
});

module.exports = VisualState;
