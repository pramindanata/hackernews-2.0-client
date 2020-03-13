import React from 'react'

const Auth = (props: any): JSX.Element => {
  return (
    <div>
      <a href="/">
        <h4>Hacker News 2.0</h4>
      </a>
      <div>{props.children}</div>
    </div>
  )
}

export default Auth
