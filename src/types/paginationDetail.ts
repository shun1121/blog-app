import { Item } from "./blogTop"

// src/pages/blog/page/[id].tsx
export type PaginationDetailProps = {
  items: Item[]
  currentPageNumber: number
  total: number
}