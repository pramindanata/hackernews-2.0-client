import React from 'react'
import styles from '@/shared/components/InvalidFeedback/index.module.css'

const InvalidFeedback = (props: { message?: string }): JSX.Element => {
  const { message } = props

  return (
    <div className={`${styles['invalid-feedback']} ${message && 'show'}`}>
      {message}
    </div>
  )
}

export default InvalidFeedback
