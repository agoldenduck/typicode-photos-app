import reducer from './index'
import { FETCH_PHOTOS_REQUEST, FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS_FAILURE } from '../actions'

describe('root photos reducer', () => {
  it('should return the initial state', () =>
    expect(reducer(undefined, {})).toEqual({
      photos: {
        isFetching: false,
        items: []
      }
    })
  )

  it('should handle FETCH_PHOTOS_REQUEST', () => {
    expect(reducer(undefined, { type: FETCH_PHOTOS_REQUEST })).toEqual({
      photos: {
        isFetching: true,
        items: []
      }
    })
  })

  it('should handle FETCH_PHOTOS_SUCCESS', () => {
    const returnedJson = [{
      'id': 1,
      'title': 'accusamus beatae ad facilis cum similique qui sunt',
      'thumbnailUrl': 'http://placehold.it/150/92c952'
    }]
    const now = Date.now()

    expect(reducer(undefined, {
      type: FETCH_PHOTOS_SUCCESS,
      items: returnedJson,
      receivedAt: now
    })).toEqual({
      photos: {
        isFetching: false,
        items: returnedJson,
        lastUpdated: now
      }
    })
  })

  it('should handle FETCH_PHOTOS_FAILURE', () => {
    const returnedError = {
      message: 'Failed to fetch',
      stack: 'TypeError: Failed to fetch'
    }

    expect(reducer(undefined, {
      type: FETCH_PHOTOS_FAILURE,
      err: returnedError
    })).toEqual({
      photos: {
        isFetching: false,
        items: [],
        err: returnedError
      }
    })
  })
})
