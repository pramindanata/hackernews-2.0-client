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

export interface NewsInput {
  title: string
  url: string
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

    export interface Modal {
      submit: boolean
    }

    export interface News {
      refetch: boolean
    }
  }

  export interface State {
    layout: Store.Layout
    auth: Store.Auth
    modal: Store.Modal
    news: Store.News
  }
}

export interface NewsFilter {
  search?: string
  sort: 'published' | 'vote'
  order: 'desc' | 'asc'
  limit: number
  offset: number
}
