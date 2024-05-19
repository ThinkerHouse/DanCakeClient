/**
 * This File is responsible to set All the reducers and create the redux store with them
 * It Will only return store
 */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducers from "./reducers/index";

// Enable debugger for development purpose will be removed in production
const composeEnhancers =
	(typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	rootReducers, // Make sure this points to your root reducer(s)
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
