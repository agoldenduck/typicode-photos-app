import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './App.css'
import { fetchPhotosIfNeeded } from '../actions'
import PhotoCard from '../components/PhotoCard'

export class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchPhotosIfNeeded())
  }

  render () {
    const { photos, isFetching, lastUpdated, err } = this.props

    return (
      <div className='app'>
        <h1 className='header'>Typicode / Photos</h1>

        <p className='last-updated'>
          { lastUpdated ? (
            <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>
          ) : (
            <span className='pt-skeleton'>Last updated at 12:34:56.</span>
          )}
        </p>

        {
          err ? (
            <span>{err.message}</span>
          )
            : isFetching && photos.length === 0 ? Array(3).fill('').map((item, i) => (
              <PhotoCard skeleton key={i} />
            ))
              : photos.length > 0 && photos.map(photo => (
                <PhotoCard
                  key={photo.id}
                  thumbnail={photo.thumbnailUrl}
                  title={photo.title}
                />
              ))
        }
      </div>
    )
  }
}

App.propTypes = {
  photos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  err: PropTypes.object
}

const mapStateToProps = state => {
  const { photos: photosReducer } = state
  const { isFetching, items: photos, lastUpdated, err } = photosReducer

  return { isFetching, photos, lastUpdated, err }
}

export default connect(mapStateToProps)(App)
