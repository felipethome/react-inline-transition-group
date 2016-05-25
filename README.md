# React Inline Transition Group

Helps to control transitions defined using inline styles. Build upon [ReactTransitionGroup](https://facebook.github.io/react/docs/animation.html), the aim is to supply a component similar to ReactCSSTransitionGroup, but that instead of working with CSS classes work with inline styles. This approach bring some advantages like:

* You don't need to decouple your styles from the component.
* You don't need to supply timeout properties as in ReactCSSTransitionGroup because the component can infer them based on the style object you pass to it.
* You have callbacks to control the start and end of your transitions for each children.

# Demo

Check out the [demo](http://felipethome.github.io/react-inline-transition-group/demo/index.html).

# How to install

    npm install react-inline-transition-group

Don't forget that you must have ReactTransitionGroup installed too. If you don't have it installed yet:

    npm install react-addons-transition-group

# How to use

Import the component to your project and then wrap the nodes you want to control the transition with it. Example:

    var React = require('react');
    var Transition = require('react-inline-transition-group');

    React.createClass({
      getInitialState: function () { return { count: 1 }; },

      handleAdd: function () {
        this.setState(function (previousState) {
          return { count: previousState.count + 1 };
        });
      },

      handleRemove: function () {
        this.setState(function (previousState) {
          return { count: Math.max(previousState.count - 1, 0) };
        });
      },

      leaveCallback: function (id) { console.log(id + ' left'); },

      render: function () {
        var styles = {
          base: {
            background: '#F00',
            width: '500px',
            height: '50px',
          },

          appear: {
            background: '#FF0',
            transition: 'all 500ms',
          },

          leave: {
            background: '#F00',
            transition: 'all 250ms',
          }
        };

        var elems = [];

        for (var i = 0; i < this.state.count; i++)
          elems.push(<div key={i} id={i}>{i}</div>);

        return (
          <div>
            <div>
              <button onClick={this.handleAdd}>Add</button>
              <button onClick={this.handleRemove}>Remove</button>
            </div>
            <Transition
              childrenBaseStyle={styles.before}
              childrenAppearStyle={styles.appear}
              childrenEnterStyle={styles.appear}
              childrenLeaveStyle={styles.leave}
              onChildLeft={this.leaveCallback}
            >
              {elems}
            </Transition>
          </div>
        );
      }
    });

## Properties

Property name | Description
------------ | -------------
component | The component that will wrap all the children. Default: div
childrenBaseStyle | Style that will be applied to all children in all transition phases
childrenAppearStyle | Style that will be merged into baseStyle to make the appear transition
childrenEnterStyle | Style that will be merged into baseStyle to make the enter transition
childrenLeaveStyle | Style that will be merge d into baseStyle to make the leave transition
onChildAppeared | Callback that will be called with the child *id* when the component appeared
onChildEntered | Callback that will be called with the child *id* when the component entered
onChildLeft | Callback that will be called with the child *id* when the component left
onChildStartAppear | Callback that will be called with the child *id* when the component start to appear
onChildStartEnter | Callback that will be called with the child *id* when the component start to enter
onChildStartLeave | Callback that will be called with the child *id* when the component start to leave

**Observation:** You can pass an *id* property to your children components and the callback will be called with it so you know exactly for which child the event is happening. This *id* is optional.

**Observation 2:** The start callbacks will be called sooner a node is being add or removed to the group. It doesn't matter if you have a delay or not. The end callbacks will be called when the longest transition time (delay + duration ) completes.

## LICENSE

BSD-3