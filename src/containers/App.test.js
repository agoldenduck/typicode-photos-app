import React from 'react'
import renderer from 'react-test-renderer'

import { App } from './App'

Date.now = jest.fn(() => 1482363367071)

const app = {
  init: (
    <App
      photos={[]}
      isFetching={false}
      dispatch={jest.fn()}
    />
  ),
  loading: (
    <App
      photos={[]}
      isFetching
      dispatch={jest.fn()}
    />
  ),
  photos: (
    <App
      photos={[{
        'id': 1,
        'title': 'accusamus beatae ad facilis cum similique qui sunt',
        'thumbnailUrl': 'http://placehold.it/150/92c952'
      }]}
      isFetching={false}
      lastUpdated={Date.now()}
      dispatch={jest.fn()}
    />
  ),
  error: (
    <App
      photos={[]}
      isFetching={false}
      err={{
        message: 'Failed to fetch',
        stack: 'TypeError: Failed to fetch'
      }}
      dispatch={jest.fn()}
    />
  )
}

describe('App snapshot', () => {
  it('matches snapshot of initial App', () => {
    const renderedValue = renderer.create(app.init)

    expect(renderedValue).toMatchSnapshot()
  })

  it('matches snapshot of loading App', () => {
    const renderedValue = renderer.create(app.loading)

    expect(renderedValue).toMatchSnapshot()
  })

  it('matches snapshot of App with data', () => {
    const renderedValue = renderer.create(app.photos)

    expect(renderedValue).toMatchSnapshot()
  })

  it('matches snapshot of errored App', () => {
    const renderedValue = renderer.create(app.error)

    expect(renderedValue).toMatchSnapshot()
  })
})
