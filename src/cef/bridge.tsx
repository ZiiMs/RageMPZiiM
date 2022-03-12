function trigger(eventName: string | number, args: string) {
  try {
    console.log(`Trigger: ${eventName}, ${args}`);
    var handlers = window.EventManager.events[eventName];
    handlers.forEach((handler: (arg0: any) => any) => handler(JSON.parse(args)));
  } catch (e) {
    console.log(e);
  }
}

trigger('', '');
