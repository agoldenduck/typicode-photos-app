import 'whatwg-fetch'

export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST'
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS'
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE'

const fetchPhotosRequest = () => ({
  type: FETCH_PHOTOS_REQUEST
})

const fetchPhotosSuccess = json => ({
  type: FETCH_PHOTOS_SUCCESS,
  items: json,
  receivedAt: Date.now()
})

const fetchPhotosFailure = err => ({
  type: FETCH_PHOTOS_FAILURE,
  err
})

const fetchPhotos = () => dispatch => {
  dispatch(fetchPhotosRequest())
  return fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
    .then(json => dispatch(fetchPhotosSuccess(json)))
    .catch(err => dispatch(fetchPhotosFailure(err)))
}

const shouldFetchPhotos = state =>
  state.photos.items.length === 0 && !state.photos.isFetching

export const fetchPhotosIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPhotos(getState())) {
    return dispatch(fetchPhotos())
  }
}
