/**
 * @author: Alfredo Quintero Tlacuilo
 * @description: A very simple and buggy event emitter
 */

class EventEmitter {
  static instance = null;
  static getInstance() {
    if (EventEmitter.instance == null) {
      EventEmitter.instance = new EventEmitter();
    }

    return EventEmitter.instance;
  }

  constructor() {
    // Setup the map of events
    this.events = new Map();
  }

  // Adds a new event listener
  addEventListener(event, fn) {
    // No key, put an array
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    // Override the event listeners array
    // Notice that I do not care if the same one is added again
    this.events.set(event, [...this.events.get(event), fn]);
  }

  // Removes event listeners to avoid memory leaks
  removeEventListener(event, fn) {
    // No key, ignore
    if (!this.events.has(event)) {
      return;
    }

    // Try to find the index
    let indexFound = -1;

    const listeners = this.events.get(event);

    for (let i; i < listeners.length; ++i) {
      if (listeners[i] === fn) {
        indexFound = i;
        break;
      }
    }

    if (indexFound !== -1) {
      // Set a new array
      this.events.set(event, [
        ...listeners.slice(0, indexFound),
        ...listeners.slice(indexFound + 1),
      ]);
    }

    // Check if its length is now zero, should be deleted from the map
    if (this.events.get(event).length === 0) {
      this.events.delete(event);
    }
  }

  emit(event, data) {
    // Check if there are any listeners
    if (!this.events.has(event)) {
      return;
    }

    // Emit to all the listeners
    this.events.get(event).forEach((listener) => {
      // Call it, no matter the context
      listener.call(null, data);
    });
  }
}
