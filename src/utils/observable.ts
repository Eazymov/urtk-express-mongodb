type Observer = (...args: any[]) => any;

type Subscribe = (eventName: string, ...observers: Observer[]) => boolean;
type Unsubscribe = (eventName: string, ...observers: Observer[]) => boolean;
type Fire = (eventName: string, params: any) => boolean;

interface Observers {
  [key: string]: Observer[];
}

interface Observable {
  observers: Observers;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  fire: Fire;
}

function bindActionToConstructor (constructor: any, action: string, fnName: string) {
  if (!constructor.__decorators__) {
    constructor.__decorators__ = [];
  }

  constructor.__decorators__.push(function (component: any) {
    component.methods[fnName] = Store.fire.bind(Store, action);
  });
}

function Action (a: any, b?: string): any {
  if (b) {
    bindActionToConstructor(a.constructor, b, b);
  } else {
    return function(target: any, fnName: string) {
      bindActionToConstructor(target.constructor, a, fnName);
    }
  }
}

const Store: Observable = {
  observers: {},

  subscribe (eventName: string, ...observers: Observer[]): boolean {
    const eventObservers: Observer[] = this.observers[eventName];

    if (!eventObservers) {
      this.observers[eventName] = [];
    }

    observers.forEach((observer: Observer) => {
      if (typeof observer !== 'function') {
        throw new TypeError('Observer is not a function');
      }

      this.observers[eventName].push(observer);
    });
    
    return true;
  },

  unsubscribe (eventName: string, ...observers: Observer[]): boolean {
    const eventObservers: Observer[] = this.observers[eventName];

    if (eventObservers === undefined) return false;

    this.observers[eventName] = eventObservers.filter(
      (eventObserver: Observer) => !observers.includes(eventObserver)
    );
    
    return true;
  },

  fire (eventName: string, params?: any): boolean {
    const eventObservers: Observer[] = this.observers[eventName];

    if (!eventObservers) return false;

    eventObservers.forEach(
      (eventObserver: Observer) => eventObserver(params)
    );

    return true;
  }
};

export {
  Action,
};

export default Store;
