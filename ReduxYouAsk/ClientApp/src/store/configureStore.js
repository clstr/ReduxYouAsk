import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';

import createRootReducer from './reducers'

export default function configureStore(history, preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = []
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension())
  }

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  return createStore(
    // root reducer with router state
    createRootReducer(history),

    //Inital State
    preloadedState,

    composeEnhancer(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
}