import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'
import classNames from 'classnames'
import 'lazysizes'

import './PhotoCard.css'

const PhotoCard = ({
  thumbnail,
  title = 'accusamus beatae ad facilis cum similique qui sunt',
  skeleton = false
}) => {
  return (
    <Card elevation={1}>
      <img
        src={
          skeleton
            ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvu2QMQAGfwJU4v6kNAAAAABJRU5ErkJggg=='
        }
        className={classNames('lazyload card-img', {'pt-skeleton': skeleton})}
        alt={skeleton ? 'skeleton image' : title}
        data-src={thumbnail}
      />

      <div className='card-title'>
        <span className={classNames({'pt-skeleton': skeleton})}>{title}</span>
      </div>
    </Card>
  )
}

PhotoCard.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  skeleton: PropTypes.bool
}

export default PhotoCard
