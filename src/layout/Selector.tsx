import React from 'react'
import Default from '@/layout/Default'
import Auth from '@/layout/Auth'

const Selector = (props: {
  tag: 'Auth' | 'Default'
  children: JSX.Element
}): JSX.Element => {
  const { tag, children } = props
  if (tag === 'Default') {
    return <Default>{children}</Default>
  }

  return <Auth>{children}</Auth>
}

export default Selector
