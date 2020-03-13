export namespace Entity {
  export interface News {
    id: number
    title: string
    domain: string
    url: string
    createdAt: string
    user?: User
    voteCount?: number
    upvoted?: boolean
  }

  export interface User {
    id: number
    username: string
    createdAt: string
    email?: string
    news?: News[]
    newsCount?: number
  }
}

export interface NewsFeed {
  total: number
  data: Entity.News[]
}

export interface AuthPayload {
  token: string
}

export namespace Redux {
  export namespace Store {
    export interface Layout {
      template: 'Default' | 'Auth'
    }

    export interface Auth {
      user: Entity.User | null
    }
  }

  export interface State {
    layout: Store.Layout
    auth: Store.Auth
  }
}

export interface NewsFilter {
  sort: 'published' | 'vote'
  order: 'desc' | 'asc'
  limit: number
  offset: number
}
