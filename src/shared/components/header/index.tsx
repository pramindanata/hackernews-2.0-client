import React, { useEffect, useState } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import useWindowDimensions from '@/shared/hook/useWindowDimensions'
import config from '@/config'
import styles from '@/shared/components/Header/style/navbar.module.css'
import MobileNav from '@/shared/components/Header/MobileNav'
import DesktopNav from '@/shared/components/Header/DesktopNav'

const Header = (): JSX.Element => {
  const { width } = useWindowDimensions()
  const [bigNavbar, setBigNavbar] = useState(true)

  useEffect(() => {
    if (width) {
      if (width < config.css.lgBreakpoint) {
        setBigNavbar(false)
      } else {
        setBigNavbar(true)
      }
    }
  }, [width])

  return (
    <div className="bg-primary">
      <Container>
        <Navbar
          // collapseOnSelect
          bg="primary"
          variant="dark"
          expand="lg"
          className={`px-0 app-navbar ${bigNavbar && styles.navbarWrapper} ${
            styles.navbar
          }`}
        >
          {!bigNavbar ? <MobileNav /> : <DesktopNav />}
        </Navbar>
      </Container>
    </div>
  )
}

export default Header
