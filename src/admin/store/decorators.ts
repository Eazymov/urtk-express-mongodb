type AnyFunc = (...args: any[]) => void;
type Subscribers = { [key: string]: string };
interface Methods {
  getSubscribers: () => Subscribers;
  [key: string]: AnyFunc;
}

function createDecorator (component: any, func: any): void {
  const constructor = component.constructor;
  const VueObservable = component.VueObservable;

  if (!VueObservable) {
    throw new Error('Vue-Observable is not installed');
  }

  if (!constructor.__decorators__) {
    constructor.__decorators__ = [];
  }

  constructor.__decorators__.push(func);
}

function bindActionToComponent (component: any, action: string, method: string) {
  return createDecorator(component, (component: any) => {
    component.methods[method] = function (params: any) {
      this.$observable.fire(action, params); 
    };
  });
}

function Action (a: any, b?: string): any {
  if (b) {
    bindActionToComponent(a, b, b);
  } else {
    return function(target: any, fnName: string) {
      bindActionToComponent(target, a, fnName);
    }
  }
}

function Subscribe (action: string): AnyFunc {
  return function(component: any, method: string): void {
    return createDecorator(component, (component: any) => {
      const methods: Methods = component.methods;
      const getSubscribers: () => Subscribers = methods.getSubscribers;
      let existingSubscribers: Subscribers = {};

      if (getSubscribers) {
        existingSubscribers = getSubscribers();
      }

      methods.getSubscribers = () => {
        return {
          ...existingSubscribers,
          [method]: action,
        };
      }
    });
  }
}

export {
  Action,
  Subscribe,
};
