import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import styles from '@/pages/Profile/index.module.css'
import { timeDifferenceForDate } from '@/util/time'
import { setSubmitModalShow, setEditProfileModalShow } from '@/store/action'
import NewsList from '@/shared/components/UserNewsList'

import * as I from '@/interface'

const Profile = (): JSX.Element => {
  const dispatch = useDispatch()
  const showEditProfileModal = useCallback(
    () => dispatch(setEditProfileModalShow(true)),
    [dispatch],
  )
  const user = useSelector<I.Redux.State, I.Entity.User>(
    state => state.auth.user as I.Entity.User,
  )

  return (
    <>
      <Helmet>
        <title>Your Profile</title>
      </Helmet>

      <div className="pt-4">
        <div className="text-center mb-5">
          <img
            className={`rounded-circle img-thumbnail mb-3 ${styles.photo}`}
            src={`/api/static/images/${user.photo}`}
            alt="Profile"
          />

          <h3 className="mb-2">{user.username}</h3>

          <div className="mb-2">
            <span>
              {user.newsCount} post{(user.newsCount as number) > 1 && 's'}
            </span>
            <span className="text-monospace mx-2">-</span>
            <span>Joined at {timeDifferenceForDate(user.createdAt)}</span>
          </div>

          <Button variant="primary" onClick={showEditProfileModal}>
            Edit Profile
          </Button>
        </div>

        <div>
          <h4 className="lead">Your posts</h4>
          <hr />

          <div>
            {(user.newsCount as number) === 0 ? (
              <p>
                You don&apos;t have any post.{' '}
                <span
                  className={`text-primary font-weight-bold ${styles['create-btn']}`}
                  onClick={(): void => dispatch(setSubmitModalShow(true))}
                >
                  Submit one
                </span>{' '}
                now !
              </p>
            ) : (
              <NewsList user={user} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
