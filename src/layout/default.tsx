import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '@/shared/components/header'

const Default = (props: any): JSX.Element => {
  return (
    <>
      <Header />
      <Container>
        <div>This is a header</div>
        {props.children}
      </Container>
    </>
  )
}

export default Default
