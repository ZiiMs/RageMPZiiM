'use strict';

function trigger(eventName, args) {
  try {
    console.log(`Trigger: ${eventName}, ${args}`);
    console.log(`Args: ${JSON.parse(args)}`);
    var handlers = window.EventManager.events[eventName];
    handlers.forEach((handler) => handler(JSON.parse(args)));
  } catch (e) {
    console.log(e);
  }
}
