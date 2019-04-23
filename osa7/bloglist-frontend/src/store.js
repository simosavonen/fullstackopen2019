import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: loginReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => console.log(store.getState()))

export default store