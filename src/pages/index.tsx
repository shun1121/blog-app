import { useMantineColorScheme } from '@mantine/core'
import clsx from 'clsx'
import { Contents } from 'newt-client-js'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { BlogList } from '../components/blogList'
import { Footer } from '../components/footer'
import { HeaderResponsive } from '../components/header'
import { client } from '../libs/client'
import { Item } from '../types/blogTop'

const Home: NextPage<Contents<Item>> = (props) => {
  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === "light"
  return (
    <div className={clsx("w-full bg-dark-5", {
      "bg-gray-2" : light
    })}>
      <div>
        <HeaderResponsive />
        <div className="max-w-[1200px] my-[80px] mx-auto">
          <BlogList blogs={props.items} />
          <div className="mt-[50px] mr-[135px] flex justify-end">
            <div className={clsx("w-[120px] h-[44px] bg-dark-6 rounded-[5px] hover:bg-dark-4", {
              "bg-gray-10 hover:bg-gray-3" : light
            })}>
              <Link href='/blog/page/1'>
                <a className='flex w-full h-full justify-center items-center font-bold'>
                  記事一覧へ
                </a>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Contents<Item>> = async () => {
  const data = await client.getContents<Item>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      limit: 4,
    },
  })
  return {
    props: data,
  }
}

export default Home
