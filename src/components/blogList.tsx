import { Grid, Image, Text, Container, useMantineColorScheme } from '@mantine/core'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Item } from '../types/blogTop'

type BlogList = {
  blogs: Item[]
}

export const BlogList: NextPage<BlogList> = ({ blogs }) => {
  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === "light"
  return (
    <Container>
      <Grid gutter={40}>
        {blogs.map((item) => (
          <Grid.Col key={item._id} sm={6}>
            <Link href={`/blog/${item._id}`} passHref>
              <div className={clsx("relative w-full h-[280px] max-h-[280px] rounded-[15px] bg-dark-6 cursor-pointer hover:bg-dark-4", {
                "bg-gray-10 hover:bg-gray-3": light
              })}>
                <a>
                  <Image src={item.coverImage?.src} height={160} alt='cover_image' />
                  <Text weight={700} size='xl' className='px-3 mt-2 line-clamp-2'>
                    {item.title}
                  </Text>
                  <Text weight={400} size='sm' className='absolute bottom-2 pl-4'>
                    {dayjs(item._sys.updatedAt).format('YYYY年MM月DD日')}
                  </Text>
                </a>
              </div>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}
