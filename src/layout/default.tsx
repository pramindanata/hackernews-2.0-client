import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '@/shared/components/header'
import Footer from '@/shared/components/Footer'

const Default = (props: any): JSX.Element => {
  return (
    <>
      <Header />
      <Container className="py-4" style={{ flex: 1 }}>
        <div>This is a header</div>
        {props.children}
      </Container>
      <Footer />
    </>
  )
}

export default Default
