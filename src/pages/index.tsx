import { createStyles } from '@mantine/core'
import { Content, Contents } from 'newt-client-js'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { BlogList } from '../components/blogList'
import { Footer } from '../components/footer'
import { HeaderResponsive } from '../components/header'
import { client } from '../libs/client'
import { links } from '../mock/headerLink'
import styles from '../styles/Home.module.css'

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
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
  buttonWrapper: {
    marginTop: '50px',
    marginRight: '135px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    width: '120px',
    height: '44px',
    borderRadius: '5px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
    },
  },
}))
const Home: NextPage<Contents<Item>> = (props) => {
  const { classes } = useStyles()

  return (
    <div className={classes.width}>
      <div className={styles.container}>
        <HeaderResponsive links={links} />
        <div className={classes.wrapper}>
          <BlogList blogs={props.items} />
          <div className={classes.buttonWrapper}>
            <div className={classes.button}>
              <Link href='/blog/page/1'>
                <a className='flex w-full h-full justify-center items-center font-bold'>
                  ???????????????
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
