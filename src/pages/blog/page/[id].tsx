import { useMantineColorScheme } from '@mantine/core'
import clsx from 'clsx'
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { BlogList } from '../../../components/blogList'
import { Footer } from '../../../components/footer'
import { HeaderResponsive } from '../../../components/header'
import { PaginationComponent } from '../../../components/pagination'
import { client } from '../../../libs/client'
import { Item } from '../../../types/blogTop'
import { PaginationDetailProps } from '../../../types/paginationDetail'

const PaginationId: NextPage<PaginationDetailProps> = ({ items, currentPageNumber, total }) => {
  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === "light"

  return (
    <div className={items.length <= 2 ? clsx("h-screen w-full relative bg-dark-5", {"bg-gray-2": light }) : clsx("bg-dark-5", {"bg-gray-2": light })}>
      <div>
        <HeaderResponsive />
        <div className={clsx("my-[80px] mx-auto max-w-[1200px]")}>
          <BlogList blogs={items} />
          <PaginationComponent currentPageNum={currentPageNumber} maxPageNum={Math.ceil(total / 6)} />
        </div>
        {items.length <= 2 ? (
          <div className={clsx("absolute bottom-0 w-full")}>
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
