import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import NavItems from './NavItems'
import Search from './Search'
import styles from './style/navbar.module.css'

const MobileNav = (): JSX.Element => {
  const location = useLocation()

  return (
    <>
      <Search
        formClassName="desktop-nav-item"
        formControlClassName={styles.searchWrapper}
      />

      <Navbar.Brand as={Link} to="/" className="desktop-nav-item">
        <h5 className="m-0">Hacker News 2.0</h5>
      </Navbar.Brand>

      <Nav
        className={`desktop-nav-item ${styles.navWrapper}`}
        activeKey={location.pathname}
      >
        <NavItems />
      </Nav>
    </>
  )
}

export default MobileNav
