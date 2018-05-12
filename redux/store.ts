interface Action {
    id: string;
    payload?: any;
}

type State = any;

interface Reducer {
    (state: State, action: Action): State;
}

class Store {

    constructor(private reducer: Reducer, private state: State) {
    }

    getState() {
        return this.state;
    }

    dispatch(action: Action) {
        this.state = this.reducer(this.state, action);
    }
}

function combineReducers(reducers: { [key: string]: Reducer }): Reducer {
    return (state: State, action: Action) => {
        let combineState = {};
        for (let key in reducers) {
            let reducer = reducers[key];
            let preState = state[key];
            let newState = reducer(preState, action);
            combineState[key] = newState;
        }
        return combineState;
    };
}

export interface Dispatch {
    (action: Action): any;
}

export interface ActionCreator {
    (args: any): Action;
}

function bindActionCreators(creators: { [key: string]: ActionCreator }, store: Store): any {
    let dist = {};
    for (let key in creators) {
        let creator = creators[key];
        dist[key] = (args: any) => {
            store.dispatch(creator(args));
        }
    }
    return dist;
}

interface Middleware {
    (store: Store): (dispatch: Dispatch) => Dispatch;
}

function applyMiddleware(store: Store, middlewares: Middleware[]): Store {
    middlewares = middlewares.reverse();
    let dispatch = store.dispatch;
    middlewares.forEach(middleware => {
        dispatch = middleware(store)(dispatch.bind(store));
    });
    store.dispatch = dispatch;
    return store;
}

let reducer: Reducer = (state: State, action: Action) => {
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

let reducers = combineReducers({
    page1: reducer,
    page2: reducer,
    page3: reducer
});

let store = new Store(reducers, {
    page1: 1,
    page2: 2,
    page3: 3
});

let logger1: Middleware = (store: Store) => (dispatch: Dispatch) => (action: Action) => {
    console.log('--------------------------------------');
    console.log('开始执行Action', action);
    let nextDispatch = dispatch(action);
    console.log('结束执行Action', action);
    console.log('');
    return nextDispatch;
};


let logger2: Middleware = (store: Store) => (dispatch: Dispatch) => (action: Action) => {
    console.log('执行前状态', store.getState());
    let nextDispatch = dispatch(action);
    console.log('执行后状态', store.getState());
    return nextDispatch;
};


applyMiddleware(store, [logger1, logger2]);

function add(payload: number) {
    return {
        id: 'Add',
        payload
    }
}

function sub(payload: number) {
    return {
        id: 'Sub',
        payload
    }
}

let actions = bindActionCreators({
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




