import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from '@/pages/Profile/index.module.css'
import { timeDifferenceForDate } from '@/util/time'
import NewsList from '@/shared/components/UserNewsList'
import Fetch from '@/shared/components/Fetch'
import UserRequest from '@/request/user'
import * as I from '@/interface'

interface DetailProps {
  user: I.Entity.User
}

const Detail = (props: DetailProps): JSX.Element => {
  const { user } = props

  return (
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
          <span>
            Joined at {timeDifferenceForDate(user.createdAt as string)}
          </span>
        </div>
      </div>

      <div>
        <h4 className="lead">{user.username}&apos;s posts</h4>
        <hr />

        <div>
          {(user.newsCount as number) === 0 ? (
            <p>This user don&apos;t have any posts.</p>
          ) : (
            <NewsList showAction={false} user={user as I.Entity.User} />
          )}
        </div>
      </div>
    </div>
  )
}

const Profile = (): JSX.Element => {
  const params = useParams<{ id: string }>()
  const authUser = useSelector<I.Redux.State>(
    state => state.auth.user,
  ) as I.Entity.User
  const [user, setUser] = useState<I.Entity.User>()

  return (
    <>
      <Helmet>
        <title>{user ? `${user.username}'s profile` : 'User profile'}</title>
      </Helmet>

      {authUser.id !== +params.id ? (
        <Fetch
          request={(): Promise<any> => UserRequest.show(params.id)}
          onSuccess={(data): void => setUser(data)}
        >
          <Detail user={user as I.Entity.User} />
        </Fetch>
      ) : (
        <Redirect to="/profile" />
      )}
    </>
  )
}

export default Profile
