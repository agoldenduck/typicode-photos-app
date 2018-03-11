import { combineReducers } from 'redux'
import { FETCH_PHOTOS_REQUEST, FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS_FAILURE } from '../actions'

const photos = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_PHOTOS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_PHOTOS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    case FETCH_PHOTOS_FAILURE:
      return Object.assign({}, state, {
        err: action.err,
        isFetching: false
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  photos
})

export default rootReducer
