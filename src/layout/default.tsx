import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '@/shared/components/header'
import Footer from '@/shared/components/Footer'
import SubmitModal from '@/shared/components/SubmitModal'

const Default = (props: any): JSX.Element => {
  return (
    <>
      <Header />
      <Container className="py-4" style={{ flex: 1 }}>
        {props.children}
      </Container>
      <Footer />

      <SubmitModal />
    </>
  )
}

export default Default
