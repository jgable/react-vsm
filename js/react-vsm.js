var React = require('react');
var { Component } = React;
var { cloneWithProps } = React.addons;

class VisualStateComponent extends Component {
  constructor() {
    super();
    this.state = {
      visualState: 'default'
    };
  }

  componentDidMount() {
    // Set the container where we will render these empty divs (in the future
    // we will want to not render an element or render into a fragment)
    this.container = this.getOrCreateContainer();

    // Set the visual state group
    var visualStates = (
      <VisualStates componentDOMNode={React.findDOMNode(this)} component={this}>
        {this.getVisualStates()}
      </VisualStates>
    );

    visualStates = React.cloneElement(visualStates, {
      ref: function (component) {
        // Set the visualStates underlying component when it's actually mounted
        this.visualStates = component;
      }.bind(this)
    });

    React.render(visualStates, this.container);
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.visualState !== this.state.visualState) {
      this.visualStates.transitionToState(this.state.visualState);
    }
  }

  getOrCreateContainer() {
    // TODO: Figure out why I can't use a document fragment here
    var el = document.getElementById('react-vsm-container');

    if (!el) {
      // Append the container if not found.
      el = document.createElement('div');
      el.id = 'react-vsm-container';
      document.body.appendChild(el);
    }

    return el;
  }

  getVisualStates() {
    return EmptyVisualGroup;
  }

  goToState(stateName) {
    this.setState({
      visualState: stateName
    });
  }
}

class VisualStates extends Component {
  getChildContext() {
    return {
      componentDOMNode: this.props.componentDOMNode
    };
  }

  render() {
    // TODO: Support more than one group
    var refChild = React.cloneElement(React.Children.only(this.props.children), {
      ref: function (component) {
        // Set the visualStates underlying component when it's actually mounted
        this.group = component;
      }.bind(this),
      componentDOMNode: this.props.componentDOMNode,
      component: this.props.component
    });

    return refChild;
  }

  transitionToState(name) {
    this.group.transitionToState(name);
  }
}

VisualStates.propTypes = {
  componentDOMNode: React.PropTypes.any
};

VisualStates.childContextTypes = {
  componentDOMNode: React.PropTypes.any.isRequired
};

class VisualStateGroup extends Component {
  constructor() {
    super();
    this.displayName = 'VisualStateGroup';
    this.currState = 'default';
    this.stateRefs = {};
  }

  componentWillMount() {
    this.refChildren = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        ref: function (component) {
          // TODO: I don't know why this happens
          if (!component) {
            return;
          }
          this.stateRefs[component.props.name] = component;
        }.bind(this),
        componentDOMNode: this.props.componentDOMNode,
        component: this.props.component
      });
    }, this);
  }

  componentDidMount() {
    // If a default state was defined, reset this.currState to it
    this.currState = this.stateRefs[this.currState] || this.currState;
  }

  render() {
    return <i>{this.refChildren}</i>;
  }

  transitionToState(state) {
    var nextState = this.stateRefs[state];
    var fromTransition = Promise.resolve();
    var nextTransition = Promise.resolve();

    console.log('VisualStateGroup.transitionToState from -> to', this.currState, nextState);

    if (this.next) {
      this.next.state.abortTransition(this.next.transition);
    }

    if (this.currState && this.currState.transitionFrom) {
      fromTransition = this.currState.transitionFrom(nextState);
    }

    if (nextState) {
      nextTransition = nextState.transitionTo({
        state: this.currState,
        transition: fromTransition
      });
      this.next = {
        state: nextState,
        transition: nextTransition
      };
    }

    Promise.all([fromTransition, nextTransition], function () {
      this.currState = this.next.state;
      this.next = null;
    }.bind(this));
  }
}

class VisualContext extends Component {
  childContextTypes: {
    componentDOMNode: React.PropTypes.any
  }

  getChildContext() {
    return {
      componentDOMNode: this.props.componentDOMNode
    };
  }
}

class VisualState extends Component {
  constructor() {
    super();
    this.displayName = 'VisualState';
    this.animRefs = [];
  }

  componentWillMount() {
    this.refChildren = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        ref: function (component) {
          // TODO: I don't know why this happens
          if (!component) {
            return;
          }
          // TODO: Duplicates are being pushed here
          this.animRefs.push(component);
        }.bind(this),
        componentDOMNode: this.props.componentDOMNode,
        component: this.props.component
      });
    }, this);
  }

  render() {
    return <i>{this.refChildren}</i>;
  }

  transitionTo(from) {
    if (!this.props.children) {
      return;
    }

    console.log('VisualState.transitionTo', this.animRefs);

    return Promise.resolve(this.animRefs.map(function (child) {
      return child.animate();
    }));
  }

  transitionFrom(to) {
    if (!this.props.children) {
      return;
    }

    return Promise.resolve();
  }

  abortTransition(transition) {
    return;
  }
}

class VisualStateAnimation extends Component {
  render() {
    return <i>{this.props.children}</i>;
  }

  animate() {
    return Promise.resolve();
  }
}

class ColorAnimation extends VisualStateAnimation {
  animate() {
    return new Promise(function (resolve) {
      var target = this.getTarget();
      Velocity(target, { backgroundColor: this.props.to }, {
        duration: 1000,
        complete: function () {
          resolve();
        }
      });
    }.bind(this));
  }

  getTarget() {
    if (this.props.target) {
      return React.findDOMNode(this.props.component).querySelectorAll(this.props.target);
    }

    return this.props.componentDOMNode;
  }
}

var EmptyVisualGroup = <VisualStateGroup />;

module.exports = {
  VisualStateComponent,
  VisualStateGroup,
  VisualState,
  VisualStateAnimation,
  ColorAnimation,
  EmptyVisualGroup
};