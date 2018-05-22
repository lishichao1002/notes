"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store(reducer, state) {
        this.reducer = reducer;
        this.state = state;
    }
    Store.prototype.getState = function () {
        return this.state;
    };
    Store.prototype.dispatch = function (action) {
        this.state = this.reducer(this.state, action);
    };
    return Store;
}());
function combineReducers(reducers) {
    return function (state, action) {
        var combineState = {};
        for (var key in reducers) {
            var reducer_1 = reducers[key];
            var preState = state[key];
            var newState = reducer_1(preState, action);
            combineState[key] = newState;
        }
        return combineState;
    };
}
function bindActionCreators(creators, store) {
    var dist = {};
    var _loop_1 = function (key) {
        var creator = creators[key];
        dist[key] = function (args) {
            store.dispatch(creator(args));
        };
    };
    for (var key in creators) {
        _loop_1(key);
    }
    return dist;
}
function applyMiddleware(store, middlewares) {
    middlewares = middlewares.reverse();
    var dispatch = store.dispatch;
    middlewares.forEach(function (middleware) {
        dispatch = middleware(store)(dispatch.bind(store));
    });
    store.dispatch = dispatch;
    return store;
}
var reducer = function (state, action) {
    switch (action.id) {
        case 'Add':
            return state + action.payload;
        case 'sub':
            return state - action.payload;
        default:
            return state;
    }
};
//0 {page1: 0, page2: 0, page3: 0}
var reducers = combineReducers({
    page1: reducer,
    page2: reducer,
    page3: reducer
});
var store = new Store(reducers, {
    page1: 1,
    page2: 2,
    page3: 3
});
var logger1 = function (store) { return function (dispatch) { return function (action) {
    console.log('--------------------------------------');
    console.log('开始执行Action', action);
    var nextDispatch = dispatch(action);
    console.log('结束执行Action', action);
    console.log('');
    return nextDispatch;
}; }; };
var logger2 = function (store) { return function (dispatch) { return function (action) {
    console.log('执行前状态', store.getState());
    var nextDispatch = dispatch(action);
    console.log('执行后状态', store.getState());
    return nextDispatch;
}; }; };
applyMiddleware(store, [logger1, logger2]);
function add(payload) {
    return {
        id: 'Add',
        payload: payload
    };
}
function sub(payload) {
    return {
        id: 'Sub',
        payload: payload
    };
}
var actions = bindActionCreators({
    add: add,
    sub: sub
}, store);
actions.add(1);
actions.sub(1);
// console.log(store.getState());
// actions.add(3);
// console.log(store.getState());
// actions.sub(2);
// console.log(store.getState());
// console.log(store.getState());
//
// store.dispatch({id: 'Add', payload: 1});
// console.log(store.getState());
//
// store.dispatch({id: 'Add', payload: 2});
// console.log(store.getState());
//
// store.dispatch({id: 'Add', payload: 3});
// console.log(store.getState());
//
// store.dispatch(add(1));
// console.log(store.getState());
// store.dispatch(add(2));
// console.log(store.getState());
// store.dispatch(add(3));
// console.log(store.getState());
//
// store.dispatch({id: 'Sub', payload: 1});
// console.log(store.getState());
