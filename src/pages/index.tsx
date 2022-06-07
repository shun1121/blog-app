import { Grid, Card, Image, Text } from '@mantine/core';
import { Content, Contents } from 'newt-client-js';
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link';
import { useState, useRef } from 'react'
import { HeaderResponsive } from '../components/header'
import { client } from '../libs/client'
import { links } from '../mock/headerLink'
import styles from '../styles/Home.module.css'


interface Post extends Content {
  title: string
  body: string
  coverImage: {
    src: string
    _id: string
  }
}
// getStaticPropsでreturnされたpropsが引数として入る
// NextPageにジェネリクスで型を指定し、propsの選択肢を表示させる
const Home: NextPage<Contents<Post>> = (props) => {
  // propsの内容 https://developers.newt.so/apis/api#section/Collection-Resources
  console.log(props)
  return (
    <div className={styles.container}>
      <HeaderResponsive links={links} />
      <div className={styles.wrapper}>
        <p>投稿数{' '}{props.total}件</p>
        <Grid gutter={40}>
          {props.items.map((item) => (
            // blogsフォルダの[id].tsxに飛ばす
            <Grid.Col span={6} key={item._id}>
              {/* <Link href={`/blog/${item._id}`} passHref>
                <div className="bg-slate-400">
                  <a>{item.title}</a>
                </div>
              </Link> */}
              <Card
                shadow="sm"
                p="xl"
                component="a"
                href={`/blog/${item._id}`}
                className="h-64"
              >
                <Card.Section>
                  <Image src={item.coverImage.src} height={160} alt="No way!" />
                </Card.Section>

                <Text weight={500} size="lg" className=''>
                  {item.title}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
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
