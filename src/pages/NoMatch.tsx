import React from 'react'

const NoMatch = (): JSX.Element => {
  return (
    <div className="mt-4">
      <div className="text-center">
        <h2 className="text-primary">Woops !</h2>
        <p className="lead">Page not found</p>
      </div>
    </div>
  )
}

export default NoMatch
