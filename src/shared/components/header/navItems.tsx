import React, { useCallback } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as I from '@/interface'
import { setSubmitModalShow } from '@/store/action'
import styles from './style/navbar.module.css'

const NavItems = (): JSX.Element => {
  const dispatch = useDispatch()
  const handleShow = useCallback(() => dispatch(setSubmitModalShow(true)), [
    dispatch,
  ])
  const user = useSelector<I.Redux.State, I.Entity.User | null>(
    state => state.auth.user,
  )

  const logout = (): void => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <>
      <Nav.Item>
        <Nav.Link as={Link} to="/" eventKey="/news">
          News
        </Nav.Link>
      </Nav.Item>

      {!user ? (
        <>
          <Nav.Item>
            <Nav.Link as={Link} to="/login" eventKey="/login">
              Submit
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/login" eventKey="/login">
              Sign In
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className={`ml-2 ${styles.signUpNavItem}`}>
            <Nav.Link
              as={Link}
              to="/register"
              eventKey="/register"
              className={`btn btn btn-outline-light ${styles.signUpNavButton}`}
            >
              Sign Up
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link onClick={handleShow}>Submit</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/profile" eventKey="/profile">
              Profile
            </Nav.Link>
          </Nav.Item>

          <Nav.Item onClick={logout}>
            <Nav.Link>Logout</Nav.Link>
          </Nav.Item>
        </>
      )}
    </>
  )
}

export default NavItems
