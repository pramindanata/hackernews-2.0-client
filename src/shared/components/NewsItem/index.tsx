import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import * as I from '@/interface'
import styles from '@/shared/components/NewsItem/index.module.css'
import { timeDifferenceForDate } from '@/util/time'
import NewsRequest from '@/request/news'
import notifier from '@/lib/awn'
import { setEditNewsModalShow } from '@/store/action'

interface Props {
  value: I.Entity.News
  index: number
  showOwner: boolean
  onVote: (index: number, id: number, upvote: boolean) => any
  showAction?: boolean
  onRemove?: (index: number, id: number) => any
  onUpdate?: (index: number, id: number) => any
}

const NewsItem = (props: Props): JSX.Element => {
  const dispatch = useDispatch()
  const {
    value,
    index,
    onVote,
    showOwner,
    onRemove,
    // onUpdate,
    showAction,
  } = props
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

  const handleVote = useCallback(() => {
    setVoting(true)

    vote()
      .then(() => {
        onVote(index, value.id, !value.upvoted)
      })
      .finally(() => {
        setVoting(false)
      })
  }, [vote, index, value, onVote, user])

  const handleRemove = useCallback(() => {
    notifier.confirm('Are you sure want to remove this data ?', () => {
      NewsRequest.delete(value.id)
        .then(() => {
          notifier.success('Data removed')

          if (onRemove) {
            onRemove(index, value.id)
          }
        })
        .catch(() => {
          notifier.alert('Woops')
        })
    })
  }, [onRemove, index, value])

  const handleUpdate = useCallback(() => {
    dispatch(
      setEditNewsModalShow({
        active: true,
        data: {
          id: value.id,
          title: value.title,
          url: value.url,
        },
      }),
    )
  }, [dispatch, value])

  const setUserLink = useCallback(() => {
    if (user && user.id === value.user?.id) {
      return '/profile'
    }

    return `/user/${value.user?.id}`
  }, [user, value])

  return (
    <div className={`p-2 border-bottom ${styles['news-item']}`}>
      {/* Main */}
      <div className="d-flex align-items-center">
        <div className="mr-3">
          {user ? (
            <Button
              variant={value.upvoted ? 'primary' : 'light'}
              active={!voting && value.upvoted}
              size="sm"
              disabled={voting}
              onClick={handleVote}
            >
              <i className="i-arrow-up" />
            </Button>
          ) : (
            <Button as={Link} to="/login" variant="light" size="sm">
              <i className="i-arrow-up" />
            </Button>
          )}
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
            {value.voteCount || 0} pts
            {showOwner ? (
              <>
                {' '}
                by{' '}
                <Link
                  to={setUserLink()}
                  className={`${
                    isMine() ? 'text-primary' : 'text-muted'
                  } font-weight-bold`}
                >
                  {value.user?.username}
                </Link>{' '}
                on
              </>
            ) : (
              <span className="mx-2">-</span>
            )}
            {createdAt}
          </div>
        </div>
      </div>

      {/* Action */}
      {showAction && (
        <div>
          <Button
            variant="dark"
            className="mr-2"
            size="sm"
            onClick={handleUpdate}
          >
            <i className="i-pencil" />
          </Button>

          <Button variant="danger" size="sm" onClick={handleRemove}>
            <i className="i-bin" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default NewsItem
