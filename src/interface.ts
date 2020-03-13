export namespace Entity {
  export interface News {
    id: number
    title: string
    domain: string
    url: string
    createdAt: string
    user?: User
    voteCount?: number
  }

  export interface User {
    id: number
    username: string
    createdAt: string
    news?: News[]
    newsCount?: number
  }
}

export interface NewsFeed {
  total: number
  data: Entity.News[]
}
