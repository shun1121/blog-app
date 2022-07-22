import { createStyles } from '@mantine/core'
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { BlogList } from '../../../components/blogList'
import { Footer } from '../../../components/footer'
import { HeaderResponsive } from '../../../components/header'
import { Pagination } from '../../../components/pagination'
import { client } from '../../../libs/client'
import { links } from '../../../mock/headerLink'
import styles from '../../../styles/Home.module.css'

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

type Props = {
  items: Item[]
  currentPageNumber: number
  total: number
}

type Sys = {
  createdAt: string
  updatedAt: string
}

type Category = {
  name: string
  slug: string
  _id: string
  _sys: Sys
}

const useStyles = createStyles((theme) => ({
  container: {
    padding: '0 2rem',
    maxWidth: '100%',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '4rem',
  },
  width: {
    width: '100%',
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
  width2: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
}))

const PaginationId: NextPage<Props> = ({ items, currentPageNumber, total }) => {
  const { classes } = useStyles()

  return (
    <div className={items.length <= 2 ? classes.width2 : classes.width}>
      <div className={styles.container}>
        <HeaderResponsive links={links} />
        <div className={classes.wrapper}>
          <BlogList blogs={items} />
          <Pagination currentPageNum={currentPageNumber} maxPageNum={Math.ceil(total / 6)} />
        </div>
        {items.length <= 2 ? (
          <div className={classes.footer}>
            <Footer />
          </div>
        ) : (
          <Footer />
        )}
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.getContents<Item>({
    appUid: 'blog',
    modelUid: 'article',
  })
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  const { total } = data
  const paths = range(1, Math.ceil(total / 4)).map((i) => `/blog/page/${i}`)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  if (!ctx.params) {
    return { notFound: true }
  }
  const pageId = Number(ctx.params.id)
  console.log(pageId)
  const data = await client.getContents<Item>({
    appUid: 'blog',
    modelUid: 'article',
  })
  const postsPerPage = data.items.slice(pageId * 6 - 6, pageId * 6)
  return {
    props: {
      items: postsPerPage,
      total: data.total,
      currentPageNumber: pageId,
    },
  }
}

export default PaginationId
