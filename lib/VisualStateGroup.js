var React = require('react');
var {PropTypes} = React;

var VisualStateGroup = React.createClass({
  displayName: 'VisualStateGroup',

  propTypes: {
    component: PropTypes.object.isRequired,
    name: PropTypes.string,
    activeState: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      name: 'default'
    };
  },

  render: function () {
    var states = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        component: this.props.component,
        active: this.props.activeState === child.props.name
      });
    });
    return <noscript>{states}</noscript>;
  }
});

module.exports = VisualStateGroup;
