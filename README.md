# React Inline Transition Group

Helps to control transitions defined using inline styles. Build upon [ReactTransitionGroup](https://facebook.github.io/react/docs/animation.html), the aim is to supply a component similar to ReactCSSTransitionGroup, but that instead of working with CSS classes work with inline styles. This approach bring some advantages like:

* You don't need to decouple your styles from the component.
* You don't need to supply timeout properties as in ReactCSSTransitionGroup because the component can infer them based on the style object you pass to it.
* You have callbacks to control the start and end of your transitions for each children.

# How to install

    npm install react-inline-transition-group

# How to use it

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
          elems.push(<div key={i} id={i}>{'Demo ' + i}</div>);

        return (
          <div>
            <div>
              <button onClick={this.handleAdd}>Add</button>
              <button onClick={this.handleRemove}>Remove</button>
            </div>
            <Transition
              baseStyle={styles.before}
              appearStyle={styles.appear}
              enterStyle={styles.appear}
              leaveStyle={styles.leave}
              onComponentLeave={this.leaveCallback}
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
baseStyle | Style that will be applied to all children in all transition phases
appearStyle | Style that will be merged into baseStyle to make the appear transition
enterStyle | Style that will be merged into baseStyle to make the enter transition
leaveStyle | Style that will be merge d into baseStyle to make the leave transition
onComponentAppeared | Callback that will be called with the child *id* when the component appeared
onComponentEntered | Callback that will be called with the child *id* when the component entered
onComponentLeft | Callback that will be called with the child *id* when the component left
onComponentStartAppear | Callback that will be called with the child *id* when the component start to appear
onComponentStartEnter | Callback that will be called with the child *id* when the component start to enter
onComponentStartLeave | Callback that will be called with the child *id* when the component start to leave

**Observation:** You can pass an *id* property to your children components and the callback will be called with it so you know exactly for which child the event is happening. This *id* is optional.

## LICENSE

BSD-3