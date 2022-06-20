import { Grid, Card, Image, Text, Container, createStyles } from '@mantine/core';
import dayjs from 'dayjs'
import { Content, Contents } from 'newt-client-js';
import type { GetStaticProps, NextPage } from 'next'
import { Footer } from '../components/footer'
import { HeaderResponsive } from '../components/header'
import { client } from '../libs/client'
import { links } from '../mock/headerLink'
import styles from '../styles/Home.module.css'


export interface Post extends Content {
  title: string
  body: string
  coverImage: {
    src: string
    _id: string
  }
  content: string
  toc: string
  data: {
    title: string
    _sys: {
      updatedAt: string
    }
  }
}

const useStyles = createStyles((theme) => ({
  container: {
    padding: "0 2rem",
    maxWidth: "100%",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    marginTop: "4rem"
  },
  width: {
    width: "100%",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  },
}))
const Home: NextPage<Contents<Post>> = (props) => {
  console.log(props)
  const { classes } = useStyles();

  return (
    <div className={classes.width}>
      <div className={styles.container}>
        <HeaderResponsive links={links} />
        <div className={classes.wrapper}>
          <Container>
          <p className='mb-3'>投稿数{' '}{props.total}件</p>
            <Grid gutter={40}>
              {props.items.map((item) => (
                <Grid.Col key={item._id} sm={6}>
                  <Card
                    shadow="sm"
                    p="xl"
                    component="a"
                    href={`/blog/${item._id}`}
                    className="relative h-64"
                  >
                    <Card.Section>
                      <Image src={item.coverImage.src} height={160} alt="No way!" />
                    </Card.Section>

                    <Text weight={500} size="lg" className='mt-2 line-clamp-2'>
                      {item.title}
                    </Text>
                    <Text weight={400} size="sm" className='absolute bottom-2'>
                      {dayjs(item._sys.updatedAt).format("YYYY年MM月DD日")}
                    </Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Contents<Post>> = async () => {
  const data = await client.getContents<Post>({
    appUid: 'blog',
    modelUid: 'article',
  })
  return {
    props: data,
  };
}

export default Home
