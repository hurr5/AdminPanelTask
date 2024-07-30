import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

const stringMiddleware = () => (next) => (action) => { // Функция возвращаемая в конце и есть dispatch с изм. функционалом
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
}

const store = createStore(
  combineReducers({ heroes, filters }),
  compose(
    applyMiddleware(thunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;

