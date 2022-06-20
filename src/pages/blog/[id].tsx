// import { Content, Contents } from "newt-client-js"
import { createStyles } from '@mantine/core';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs'
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useEffect } from 'react';
import tocbot from 'tocbot'
import { Post } from ".."
import { Footer } from '../../components/footer';
import { HeaderResponsive } from "../../components/header"
import { Profile } from '../../components/profile';
import { client } from "../../libs/client"
import { links } from "../../mock/headerLink"

const useStyles = createStyles((theme) => ({
  border: {
    marginTop: 120,
    paddingTop: 40,
    paddingBottom: 30,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]}`,
  },
  sectionWrapper: {
    [theme.fn.smallerThan(1024)]: {
      width: "90%",
      margin: "0 auto",
    },
    width: "calc(100% - 330px)",
  },
  container: {
    width: "100%",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
  background: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    padding: 40,
    borderRadius: "10px",
  },
  side: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    padding: 20,
    borderRadius: "10px",
    width: "273.688px",
  }
}))

const Blog: NextPage<Post> = (props) => {
  const { classes } = useStyles();
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: 'body',
      headingSelector: 'h2, h3',
    })

    return () => tocbot.destroy()
  })
  return (
    <div className={classes.container}>
      <HeaderResponsive links={links} />
      <div className={classes.background}>
        <div className="flex space-x-6 justify-center pt-8">
          <section className={classes.sectionWrapper}>
            <div className={classes.section}>
              <h1 className='font-bold'>{props.data.title}</h1>
              <p className='text-[14px] mt-2 mb-6'>{dayjs(props.data._sys.updatedAt).format("YYYY年MM月DD日")}</p>
              <div dangerouslySetInnerHTML={{
                __html: props.content,
              }}/>
              <div>{props.content}</div>
            </div>
            <div>
              <Profile
                avatar="https://storage.googleapis.com/newt-images/accounts/62613f9a7a9cb90018e3e90e/1655363247483/20210112_125421.jpeg"
                name="福西俊介"
                title="フロントエンドエンジニアと名乗りたい"
              />
            </div>
          </section>
          <aside className='hidden sm:hidden md:hidden lg:block xl:block'>
            <div className='sticky top-12'>
              <div className={classes.side}>
                <p className='text-lg pb-3 font-bold'>目次</p>
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
  const data = await client.getContents<Post>({
    appUid: 'blog',
    modelUid: 'article',
  })
  // 記事のidを配列で返す。
  const ids = data.items.map((item) => `/blog/${item._id}`)
  return {
    paths: ids,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps<{}, {id: string}> = async (context) => {
  if (!context.params) {
    return { notFound: true }
  }
  const data = await client.getContent<Post>({
    appUid: 'blog',
    modelUid: 'article',
    contentId: context.params.id,
  })
  const $ = cheerio.load(data.body,{ decodeEntities: false })
  $('h2, h3').each((index, elm) => {
    $(elm).html();
    $(elm).addClass("headings")
    $(elm).attr('id', `${index}`)
  });
  return {
    props: {
      data: data,
      content: $.html()
    },
  };
}

export default Blog