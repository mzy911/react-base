import { filter, mapTo, delay } from 'rxjs/operators';
import { ofType } from 'redux-observable';


const pingEpic = action$ => action$.pipe(
  // 过滤触发的 action
  // filter(action => action.type === 'PING'),
  // 等同于filter
  ofType('PING'),
  // 延迟1秒后触发
  delay(1000),
  // 相当于触发 dispatch
  mapTo({ type: 'PONG' })
);



const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case 'PING':
      return { isPinging: true };
    case 'PONG':
      return { isPinging: false };
    default:
      return state;
  }
};



