# React Inline Transition Group

This component helps you to control transitions defined with inline styles. Built with [ReactTransitionHooks](https://github.com/felipethome/react-transition-hooks), the goal is to supply a more up-to-date alternative to [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html).

[![Build Status](https://travis-ci.org/felipethome/react-inline-transition-group.svg?branch=master)](https://travis-ci.org/felipethome/react-inline-transition-group) [![Coverage Status](https://coveralls.io/repos/github/felipethome/react-inline-transition-group/badge.svg)](https://coveralls.io/github/felipethome/react-inline-transition-group)

## Advantages

* You don't need to decouple your styles from the component.
* You don't need to supply timeout properties as in *ReactCSSTransitionGroup*.
* You have callbacks to control the start and end of your transitions for each child.
* *ReactCSSTransitionGroup* uses timeouts to control the animations which means some situations can break its behavior, like in frame rates lower than 60fps.
* *ReactCSSTransitionGroup* uses *ReactTransitionGroup* which means you can't interrupt animations.

## Live Demo

Check out the [demo](http://felipethome.github.io/react-inline-transition-group/).

## How to install

    npm install react-inline-transition-group

## How to use

Import the component to your project and then wrap the nodes you want to control the transition with it. Example:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-inline-transition-group';

export default class Demo extends React.Component {
  constructor() {
    super();
    this.state = {count: 1};
  }

  handleAdd = () => {
    this.setState((previousState) => {
      return {count: previousState.count + 1};
    });
  };

  handleRemove = () => {
    this.setState((previousState) => {
      return {count: Math.max(previousState.count - 1, 0)};
    });
  };

  handlePhaseEnd = (phase, id) => {
    if (phase === 'leave') console.log(id + ' left');
  };

  render() {
    const styles = {
      container: {
        width: '500px',
      },

      base: {
        width: '100%',
        height: '50px',
        background: '#4CAF50',
        opacity: 0,
      },

      appear: {
        opacity: 1,
        transition: 'all 500ms',
      },

      leave: {
        opacity: 0,
        transition: 'all 250ms',
      },

      custom: {
        background: '#3F51B5',
      },
    };

    const elems = [];

    // Don't forget that for most React components use array indexes as
    // keys is a bad idea (but not for this example).
    for (let i = 0; i < this.state.count; i++)
      elems.push(<div key={i} id={i} style={i % 2 ? styles.custom : {}}>{i}</div>);

    return (
      <div>
        <div>
          <button onClick={this.handleAdd}>Add</button>
          <button onClick={this.handleRemove}>Remove</button>
        </div>
        <Transition
          childrenStyles={{
            base: styles.base,
            appear: styles.appear,
            enter: styles.appear,
            leave: styles.leave,
          }}
          onPhaseEnd={this.handlePhaseEnd}
          style={styles.container}
        >
          {elems}
        </Transition>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('container'));
```

Notice above that `{elems}` are *divs*, but they could be any other React component, just remember to pass the property *style* that your React component is receiving down to the HTML element that will get these styles. Example:

```jsx
const SomeComponent = (props) => (
  <div style={props.style}>
    {props.children}
  </div>
);

const App = () => {
  const elems = [];

  // Don't worry, you can still apply custom styles to each element.
  const otherStyle = { ... };

  for (let i = 0; i < this.state.count; i++)
    elems.push(<SomeComponent style={otherStyle} key={i} id={i}>{i}</SomeComponent>);

  return (
    <Transition
      childrenStyles={{ ... }}
    >
      {elems}
    </Transition>
  );
};
```


## Properties

Property name | Description
------------ | -------------
**component** | String. The component that will wrap all the children. Default: `div`.
**chindrenStyles** | Object. This object has the properties: `base`, `appear`, `enter` and `leave`. Each of these properties is another object containing the styles for the respective phase. The `base` styles are applied to all children in all phases.
**onPhaseStart** | Function. Callback that will be called with the current phase (`appear`, `enter` or `leave`) and the child `id` when the phase begins, in this order.
**onPhaseEnd** | Function. Callback that will be called with the current phase (`appear`, `enter` or `leave`) and the child `id` when the phase ends, in this order.

### Notes

1. You can pass an `id` property to your children components and the callback will be called with it so you know exactly for which child the event happened. This `id` is optional.

2. The `onPhaseStart` callback will be called sooner a node is being added or removed to/from the group. If you have a delay in your CSS transition the component will not wait until the delay is complete to call the callback.

3. The `onPhaseEnd` callback will be called when the longest transition time (delay + duration) completes. Notice that if a transition is interrupted this callback will not be called.

## What is meant by phase

There are three phases in this component (the same as in ReactCSSTransitionGroup):

* **appear**: happens to any child component that is already inside of ReactInlineTransitionGroup at the moment of its creation, or in other words, at the time the ReactInlineTransitionGroup component just mounted.

* **enter**: happens to any child component that is inserted in ReactInlineTransitionGroup after its creation.

* **leave**: happens to any child component that is being removed from ReactInlineTransitionGroup.

## LICENSE

BSD-3