import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'

const middleware = (history) => [
  thunk,
  routerMiddleware(history),
  logger
]

export default middleware