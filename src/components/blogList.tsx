import { Grid, Card, Image, Text, Container } from '@mantine/core'
import dayjs from 'dayjs'
import type { NextPage } from 'next'
import { Item } from '../pages'

type BlogList = {
  blogs: Item[]
}

export const BlogList: NextPage<BlogList> = ({ blogs }) => {

  return (
    <Container>
      <Grid gutter={40}>
        {blogs.map((item) => (
          <Grid.Col key={item._id} sm={6}>
            <Card
              shadow='sm'
              p='xl'
              component='a'
              href={`/blog/${item._id}`}
              className='relative h-64'
            >
              <Card.Section>
                <Image src={item.coverImage?.src} height={160} alt='cover_image' />
              </Card.Section>

              <Text weight={500} size='lg' className='mt-2 line-clamp-2'>
                {item.title}
              </Text>
              <Text weight={400} size='sm' className='absolute bottom-2'>
                {dayjs(item._sys.updatedAt).format('YYYY年MM月DD日')}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}
