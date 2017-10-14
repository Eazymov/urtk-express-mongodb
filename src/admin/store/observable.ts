
class VueObservable {
  public observers = {};

  public subscribe (eventName: string, ...observers: Observer[]): boolean {
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
  }

  public unsubscribe (eventName: string, ...observers: Observer[]): boolean {
    const eventObservers: Observer[] = this.observers[eventName];

    if (eventObservers === undefined) return false;

    this.observers[eventName] = eventObservers.filter(
      (eventObserver: Observer) => !observers.includes(eventObserver)
    );
    
    return true;
  }

  public fire (eventName: string, params?: any): boolean {
    const eventObservers: Observer[] = this.observers[eventName];

    if (!eventObservers) return false;

    eventObservers.forEach(
      (eventObserver: Observer) => eventObserver(params)
    );

    return true;
  }

  static install (Vue: any) {
    Vue.prototype.VueObservable = this;

    Vue.mixin({
      beforeCreate (): void {
        const options: any = this.$options;

        if (options.observable) {
          this.$observable = options.observable;
        } else if (options.parent && options.parent.$observable) {
          this.$observable = options.parent.$observable;
        }
      },
      created (): void {
        bindSubscribers(this);
      }
    });
  }
}

function bindSubscribers (component: any) {
  if (typeof component.getSubscribers !== 'function') return false; 
  
  const subscribers: any = component.getSubscribers();
  const observable: any = component.$observable;
  
  Object
    .keys(subscribers)
    .forEach((key: string) => {
      const handler: (...args: any[]) => any = component[key];

      observable.subscribe(subscribers[key], handler);
    });

  return delete component.getSubscribers;
}

export default VueObservable;
