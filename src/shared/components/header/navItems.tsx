import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as I from '@/interface'
import styles from './style/navbar.module.css'

const NavItems = (): JSX.Element => {
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

      <Nav.Item>
        <Nav.Link as={Link} to="/submit" eventKey="/submit">
          Submit
        </Nav.Link>
      </Nav.Item>

      {!user ? (
        <>
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
