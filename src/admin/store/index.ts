import Vue from 'vue';
import VueObservable from './observable';
export { Action, Subscribe, } from './decorators';

Vue.use(VueObservable);

const observable = new VueObservable();

export default observable;
