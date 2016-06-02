import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createAction} from 'redux-actions';
import {CHANGE_WORD} from './ActionType';
import promiseMiddleware from 'redux-promise';
import wordService from '../definition/service/definitionService';
import reducers from './reducersConfig';

export const store = createStore(
    combineReducers(reducers),
    {},
    applyMiddleware(promiseMiddleware)
);

export const actions = {
    changeWord : createAction(CHANGE_WORD, wordService.changeWord)
};
