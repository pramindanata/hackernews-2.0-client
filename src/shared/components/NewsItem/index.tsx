import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import * as I from '@/interface'
import styles from '@/shared/components/NewsItem/index.module.css'
import { timeDifferenceForDate } from '@/util/time'

const NewsItem = (props: { value: I.Entity.News }): JSX.Element => {
  const { value } = props
  const user = useSelector<I.Redux.State, I.Entity.User | null>(
    state => state.auth.user,
  )
  const isMine = useCallback(() => {
    if (!user) {
      return false
    }

    if (user.id === value.user?.id) {
      return true
    }
  }, [user, value])
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
          <a
            href="/"
            className={`${
              isMine() ? 'text-primary' : 'text-muted'
            } font-weight-bold`}
          >
            {value.user?.username}
          </a>{' '}
          on {createdAt}
        </div>
      </div>
    </div>
  )
}

export default NewsItem
