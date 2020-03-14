import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import * as I from '@/interface'
import styles from '@/shared/components/NewsItem/index.module.css'
import { timeDifferenceForDate } from '@/util/time'
import NewsRequest from '@/request/news'

interface Props {
  value: I.Entity.News
  index: number
  onVote: (index: number, id: number, upvote: boolean) => any
}

const NewsItem = (props: Props): JSX.Element => {
  const history = useHistory()
  const { value, index, onVote } = props
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

  const [voting, setVoting] = useState<boolean>(false)

  const vote = useCallback(async () => {
    const req = value.upvoted ? NewsRequest.unvote : NewsRequest.vote

    await req(value.id)
  }, [value])

  const handleClick = useCallback(() => {
    if (!user) {
      history.push('/login')
    }

    setVoting(true)

    vote()
      .then(() => {
        onVote(index, value.id, !value.upvoted)
      })
      .finally(() => {
        setVoting(false)
      })
  }, [vote, index, value, onVote, history, user])

  return (
    <div className={`p-2 border-bottom ${styles['news-item']}`}>
      <div className="mr-3">
        <Button
          variant={value.upvoted ? 'primary' : 'light'}
          active={!voting && value.upvoted}
          size="sm"
          disabled={voting}
          onClick={handleClick}
        >
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
