import { Content } from 'newt-client-js'

export interface Props extends Content {
  items: Item[]
}

export type Item = {
  author: string | null
  body: string
  categories: Category[]
  coverImage: {
    _id: string
    fileName: string
    fileSize: number
    fileType: string
    height: number
    src: string
    width: number
  }
  slug: string
  title: string
  _id: string
  _sys: Sys
}

export type Sys = {
  createdAt: string
  updatedAt: string
}

export type Category = {
  name: string
  slug: string
  _id: string
  _sys: Sys
}