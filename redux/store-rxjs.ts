import {BehaviorSubject, Subscription} from "rxjs/index";

export interface Action {
    type: string;
    payload?: any;
}

export interface Reducer<T> {
    (state: T, action: Action): T;
}

export class Store<T> {
    private subject: BehaviorSubject<T>;

    constructor(private reducer: Reducer<T>, private initialState: T) {
        this.subject = new BehaviorSubject<T>(initialState);
    }

    getState(): T {
        return this.initialState;
    }

    dispatch(action: Action): void {
        this.initialState = this.reducer(this.initialState, action);
        this.subject.next(this.initialState);
    }

    subscribe(listener: (next) => void): Subscription {
        return this.subject.asObservable().subscribe(listener);
    }
}

export function combineReducers(reducers: { [key: string]: Reducer<any> }): Reducer<any> {
    return (state: any, action: Action) => {
        let combineState = {};
        for (let stateKey in reducers) {
            let stateReducer = reducers[stateKey];
            let preState = state[stateKey];
            let nextState = stateReducer(preState, action);
            combineState[stateKey] = nextState;
        }
        return combineState;
    }
}

export interface Dispatch {
    (action: Action): any;
}

export interface Middleware {
    (store: Store<any>): (dispatch: Dispatch) => Dispatch;
}

export function applyMiddleware(store: Store<any>, middlewares: Middleware[]) {
    middlewares = middlewares.reverse();
    let dispatch = store.dispatch;
    middlewares.forEach((middleware) => {
        dispatch = middleware(store)(dispatch.bind(store));
    });
    store.dispatch = dispatch;
    return store;
}

let logger1: Middleware = (store: Store<any>) => (dispatch: Dispatch) => (action: Action) => {
    console.log('--------------------------------------');
    console.log('开始执行Action', action);
    let nextDispatch = dispatch(action);
    console.log('结束执行Action', action);
    console.log('');
    return nextDispatch;
};


let logger2: Middleware = (store: Store<any>) => (dispatch: Dispatch) => (action: Action) => {
    console.log('执行前状态', store.getState());
    let nextDispatch = dispatch(action);
    console.log('执行后状态', store.getState());
    return nextDispatch;
};


let reducer: Reducer<number> = (state: number, action: Action) => {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        case 'PLUS':
            return state + action.payload;
        case 'MINUS':
            return state - action.payload;
        default:
            return state;
    }
};

let reducers = combineReducers({
    reducer1: reducer,
    reducer2: reducer,
    reducer3: reducer
});

let store = new Store<any>(reducers, {
    reducer1: 1,
    reducer2: 2,
    reducer3: 3
});
applyMiddleware(store, [logger1, logger2]);


export function plus(num: number) {
    return {
        type: 'PLUS',
        payload: num
    }
}

export function minus(num: number) {
    return {
        type: 'MINUS',
        payload: num
    }
}


// store.subscribe((val) => console.log('state: ', val));

store.dispatch({type: 'ADD'});
store.dispatch({type: 'ADD'});
store.dispatch({type: 'SUB'});
store.dispatch({type: 'PLUS', payload: 5});
store.dispatch(plus(3));
store.dispatch(minus(3));

export function bindActionCreators(actionCreators: { [key: string]: any }, dispatch: Dispatch): any {
    let obj = {};
    for (let key in actionCreators) {
        let creator = actionCreators[key];
        obj[key] = (args) => dispatch(creator(args));
    }
    return obj;
}

// 注意,关键代码在这里
var actions = bindActionCreators({
    plus,
    minus
}, store.dispatch);

actions.plus(2);
actions.minus(2);