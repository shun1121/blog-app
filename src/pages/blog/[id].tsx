import { useMantineColorScheme } from '@mantine/core'
import * as cheerio from 'cheerio'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import tocbot from 'tocbot'
import { Footer } from '../../components/footer'
import { HeaderResponsive } from '../../components/header'
import { Profile } from '../../components/profile'
import { client } from '../../libs/client'
import 'highlight.js/styles/hybrid.css'
import { Item } from '../../types/blogTop'
import { Data } from '../../types/blogDetail'
import clsx from 'clsx'
import { useMediaQuery } from '@mantine/hooks';

const Blog: NextPage<Data> = (props) => {
  const matches = useMediaQuery("(max-width: 1024px)")
  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === "light"
  
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: 'body',
      headingSelector: 'h2, h3',
    })
    return () => tocbot.destroy()
  },[])
  return (
    <div className={clsx("w-full bg-dark-5", {
      "bg-gray-2": light
    })}>
      <HeaderResponsive />
      <div className={clsx("mx-w-[1200px] my-[80px] mx-auto")}>
        <div className='flex space-x-6 justify-center pt-8'>
          <section className={clsx("w-[calc(100%-330px)]", {
            "w-[90%] my-0 mx-auto" : matches,
          })}>
            <div className={clsx("p-[40px] rounded-[10px] bg-dark-6 border-[1px] border-dark-7", {
              "bg-gray-10 border-none": light
            })}>
              <h1 className='font-bold'>{props.data.title}</h1>
              <p className='text-[14px] mt-2 mb-6'>
                {dayjs(props.data._sys.updatedAt).format('YYYY年MM月DD日')}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.highlightedBody,
                }}
              />
            </div>
            <div>
              <Profile
                avatar='https://storage.googleapis.com/newt-images/accounts/62613f9a7a9cb90018e3e90e/1655363247483/20210112_125421.jpeg'
                name='福西俊介'
                title='フロントエンドエンジニアと名乗りたい'
              />
            </div>
          </section>
          <aside className='hidden sm:hidden md:hidden lg:block xl:block'>
            <div className='sticky top-8'>
              <div className={clsx("py-[20px] pl-[25px] w-[273.688px] rounded-[10px] bg-dark-6 border-[1px] border-dark-7", {
                "bg-gray-10 border-none": light
              })}>
                <div className='text-lg font-bold pb-3'>目次</div>
                <nav className='toc' />
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getContents<Item>({
    appUid: 'blog',
    modelUid: 'article',
  })
  const ids = data.items.map((item) => `/blog/${item._id}`)
  return {
    paths: ids,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps<Record<string, unknown>, { id: string }> = async (context) => {
  if (!context.params) {
    return { notFound: true }
  }
  const data = await client.getContent<Item>({
    appUid: 'blog',
    modelUid: 'article',
    contentId: context.params.id,
  })
  const $ = cheerio.load(data.body, { decodeEntities: false })
  $('h2, h3').each((index, elm) => {
    $(elm).html()
    $(elm).addClass('headings')
    $(elm).attr('id', `${index}`)
  })
  $('a').each((_, elm) => {
    $(elm).html()
    $(elm).addClass('anchor')
  })
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
  return {
    props: {
      data: data,
      highlightedBody: $.html(),
    },
  }
}

export default Blog
