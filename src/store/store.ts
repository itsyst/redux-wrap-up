import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { reducer } from './bugs';


const store = createStore(
    reducer,
    devToolsEnhancer({
        name: `Redux`,
        trace: true,
        traceLimit: 25,
    })
);

export default store;