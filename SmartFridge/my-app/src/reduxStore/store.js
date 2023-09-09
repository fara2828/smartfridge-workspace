const createStore = require('redux').createStore;
const rootReducer = require('../reducers/rootReducer');  // rootReducer는 여러분이 작성한 루트 리듀서입니다.

const store = createStore(rootReducer);

module.exports = store;