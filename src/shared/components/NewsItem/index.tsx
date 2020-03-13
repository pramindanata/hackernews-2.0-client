import React from 'react'
import { Button } from 'react-bootstrap'
import * as I from '@/interface'
import styles from '@/shared/components/NewsItem/index.module.css'
import { timeDifferenceForDate } from '@/util/time'

const NewsItem = (props: { value: I.Entity.News }): JSX.Element => {
  const { value } = props
  const createdAt = timeDifferenceForDate(value.createdAt)

  return (
    <div className={`p-2 border-bottom ${styles['news-item']}`}>
      <div className="mr-3">
        <Button variant="outline-primary" active={value.upvoted} size="sm">
          <i className="i-arrow-up" />
        </Button>
      </div>
      <div>
        <div className="font-weight-bold">
          <a
            href={value.url}
            className="text-decoration-none text-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mr-2">{value.title}</span>
            <span className="text-muted">({value.domain})</span>
          </a>
        </div>

        <div className="text-sm text-muted">
          {value.voteCount || 0} pts by{' '}
          <a href="/" className="text-muted">
            {value.user?.username}
          </a>{' '}
          on {createdAt}
        </div>
      </div>
    </div>
  )
}

export default NewsItem
