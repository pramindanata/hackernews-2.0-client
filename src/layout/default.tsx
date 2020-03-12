import React from 'react'

export default (props: any) => {
  return (
    <div>
      <div>This is a header</div>
      { props.children }
    </div>
  )
}