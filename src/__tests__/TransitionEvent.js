class TransitionEvent extends Event {
  constructor(type, options) {
    super(type);
    for (var key in options) {
      if (options.hasOwnProperty(key)) this[key] = options[key];
    }
  }
}

module.exports = TransitionEvent;