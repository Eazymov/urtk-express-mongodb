type Observer = (...args: any[]) => any;

type Subscribe = (eventName: string, ...observers: Observer[]) => boolean;
type Unsubscribe = (eventName: string, ...observers: Observer[]) => boolean;
type Fire = (eventName: string, params: any) => boolean;

interface Observers {
  [key: string]: Observer[];
}

interface ObservableInstance {
  observers: Observers;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  fire: Fire;
}

const Observable: ObservableInstance = {
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

  fire (eventName: string, params: any): boolean {
    const eventObservers: Observer[] = this.observers[eventName];

    if (!eventObservers) return false;

    eventObservers.forEach(
      (eventObserver: Observer) => eventObserver(params)
    );

    return true;
  }
};

export default Observable;
