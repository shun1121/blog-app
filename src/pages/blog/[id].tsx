import { createStyles } from '@mantine/core'
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

const useStyles = createStyles((theme) => ({
  border: {
    marginTop: 120,
    paddingTop: 40,
    paddingBottom: 30,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }`,
  },
  sectionWrapper: {
    [theme.fn.smallerThan(1024)]: {
      width: '90%',
      margin: '0 auto',
    },
    width: 'calc(100% - 330px)',
  },
  container: {
    width: '100%',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
  background: {
    maxWidth: '1200px',
    margin: '80px auto',
  },
  section: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : null}`,
    padding: 40,
    borderRadius: '10px',
  },
  side: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : null}`,
    padding: "20px 0px 20px 25px",
    borderRadius: '10px',
    width: '273.688px',
  },
}))

const Blog: NextPage<Data> = (props) => {
  const { classes } = useStyles()
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: 'body',
      headingSelector: 'h2, h3',
    })
    return () => tocbot.destroy()
  },[])
  return (
    <div className={classes.container}>
      <HeaderResponsive />
      <div className={classes.background}>
        <div className='flex space-x-6 justify-center pt-8'>
          <section className={classes.sectionWrapper}>
            <div className={classes.section}>
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
              <div className={classes.side}>
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
