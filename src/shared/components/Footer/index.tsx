import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '@/shared/components/Footer/index.module.css'

const Footer = (): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <div className="bg-dark text-light">
      <Container className="text-center py-4">
        <div>
          <span className={styles.copyright}>&copy;</span> {year} cool_snek
        </div>
        <div className="text-sm text-muted">
          Developed by <span>Eksa Pramindanata</span>
        </div>
      </Container>
    </div>
  )
}

export default Footer
