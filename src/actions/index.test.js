import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  fetchPhotosIfNeeded
} from '../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetch photos', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const fetchSuccessBody = [{
    'id': 1,
    'title': 'accusamus beatae ad facilis cum similique qui sunt',
    'thumbnailUrl': 'http://placehold.it/150/92c952'
  }]

  it('creates FETCH_PHOTOS_SUCCESS when fetching photos has been done', () => {
    fetchMock.getOnce('*', {
      body: fetchSuccessBody,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: FETCH_PHOTOS_REQUEST },
      { type: FETCH_PHOTOS_SUCCESS, items: expect.any(Array), receivedAt: expect.any(Number) }
    ]

    const store = mockStore({ photos: { items: [] } })

    return store.dispatch(fetchPhotosIfNeeded()).then(() =>
      expect(store.getActions()).toEqual(expectedActions)
    )
  })

  it('creates FETCH_PHOTOS_FAILURE when an error has occurred', () => {
    fetchMock.getOnce('*', {
      body: {},
      status: 404,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: FETCH_PHOTOS_REQUEST },
      { type: FETCH_PHOTOS_FAILURE, err: expect.any(Object) }
    ]

    const store = mockStore({ photos: { items: [] } })

    return store.dispatch(fetchPhotosIfNeeded()).then(() =>
      expect(store.getActions()).toEqual(expectedActions)
    )
  })
})
