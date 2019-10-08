// Framework Libraries
import React from 'react'
import ReactDOM from 'react-dom'

// Redux and routing libraries
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Router } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'

// Redux Store
import configureStore from './store/configureStore'
import { createBrowserHistory } from 'history'

// PWA ServiceWorker
import registerServiceWorker from './registerServiceWorker'

// Our main app container
import App from './App'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
const history = createBrowserHistory({ basename: baseUrl })

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState)
const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    {/*
      BrowserRouter does not work under ConnectedRouter
      https://github.com/supasate/connected-react-router/issues/230#issuecomment-461628073
    */}
    <ConnectedRouter history={history}>
      <Router history={history}>
        <ReduxToastr
          timeOut={2000}
          newestOnTop={true}
          position={"top-right"}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick />
        <App />
      </Router>
    </ConnectedRouter>
  </Provider>,
  rootElement
);

registerServiceWorker()
