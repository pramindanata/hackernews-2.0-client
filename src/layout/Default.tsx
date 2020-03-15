import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

import * as I from '@/interface'
import Header from '@/shared/components/header'
import Footer from '@/shared/components/Footer'
import SubmitModal from '@/shared/components/SubmitModal'
import EditProfileModal from '@/shared/components/EditProfileModal'
import EditNewsModal from '@/shared/components/EditNewsModal'

const Default = (props: any): JSX.Element => {
  const user = useSelector<I.Redux.State, I.Entity.User>(
    state => state.auth.user as I.Entity.User,
  )

  return (
    <>
      <Header />
      <Container className="py-4" style={{ flex: 1 }}>
        {props.children}
      </Container>
      <Footer />

      <SubmitModal />
      {user && <EditProfileModal />}
      {user && <EditNewsModal />}
    </>
  )
}

export default Default
