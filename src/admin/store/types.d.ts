type Observer = (...args: any[]) => any;

type Subscribe = (eventName: string, ...observers: Observer[]) => boolean;
type Unsubscribe = (eventName: string, ...observers: Observer[]) => boolean;
type Fire = (eventName: string, params: any) => boolean;

interface Observers {
  [key: string]: Observer[];
}

interface VueObservable {
  observers: Observers;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  fire: Fire;
  install: (...args: any[]) => void;
}
