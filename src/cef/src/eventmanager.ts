const EventManager = window.EventManager || {
  events: {},

  addHandler: function (eventName: string, handler: any) {
    if (eventName in this.events) {
      this.events[eventName].push(handler);
    } else {
      this.events[eventName] = [handler];
    }
  },

  removeHandler: function (eventName: string, handler: any) {
    if (eventName in this.events) {
      var index = this.events[eventName].indexOf(handler);
      this.events[eventName].splice(index, 1);
    }
  },
};

window.EventManager = EventManager;

export default EventManager;
