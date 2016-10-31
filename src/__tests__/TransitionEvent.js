function TransitionEvent(type, options) {
  Event.call(this, type);

  for (var key in options) {
    if (options.hasOwnProperty(key)) this[key] = options[key];
  }
}

TransitionEvent.prototype = Object.create(Event.prototype);
TransitionEvent.prototype.constructor = TransitionEvent;

module.exports = TransitionEvent;