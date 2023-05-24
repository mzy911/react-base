import { Observable } from 'rxjs';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/operator/switchMap';
import { combineEpics } from 'redux-observable';
import { generateActionFn } from '@/utils/model/action';
import { ACTION } from './const';

const epics = [
  action$ => action$.ofType(ACTION.CAUGHT).switchMap(({
    payload: err
  }) => Observable.fromPromise(Promise.resolve().then(()=>'错误')).map(generateActionFn(ACTION.DISMISS)))
];

export default combineEpics(...epics);
