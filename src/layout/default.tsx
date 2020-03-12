import React from 'react'

const Default = (props: any): JSX.Element => {
  return (
    <div>
      <div>This is a header</div>
      {props.children}
    </div>
  )
}

export default Default
