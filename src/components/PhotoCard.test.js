import React from 'react'
import renderer from 'react-test-renderer'

import PhotoCard from './PhotoCard'

describe('PhotoCard snapshot', () => {
  it('matches snapshot of PhotoCard with data', () => {
    const renderedValue = renderer.create((
      <PhotoCard
        thumbnail='http://placehold.it/150/92c952'
        title='accusamus beatae ad facilis cum similique qui sunt'
      />
    ))

    expect(renderedValue).toMatchSnapshot()
  })

  it('matches snapshot of skeleton PhotoCard', () => {
    const renderedValue = renderer.create((
      <PhotoCard skeleton />
    ))

    expect(renderedValue).toMatchSnapshot()
  })
})
