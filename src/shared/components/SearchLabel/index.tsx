import React from 'react'

interface Props {
  value: string
}

const SearchLabel = (props: Props): JSX.Element => {
  const { value } = props

  return (
    <div>
      <p className="lead">
        Result for:{' '}
        <span className="font-italic text-muted">&quot;{value}&quot;</span>
      </p>

      <hr />
    </div>
  )
}

export default SearchLabel
