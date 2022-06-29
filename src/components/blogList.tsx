import { Grid, Image, Text, Container, createStyles, Card } from '@mantine/core'
import dayjs from 'dayjs'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Item } from '../pages'

type BlogList = {
  blogs: Item[]
}

const useStyles = createStyles((theme) => ({
  postsWrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
    },
    width: '100%',
    height: '280px',
    maxHeight: '280px',
    borderRadius: '15px',
    position: 'relative',
    cursor: 'pointer',
  },
  button: {
    width: '120px',
    height: '44px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: '5px',
  },
}))

export const BlogList: NextPage<BlogList> = ({ blogs }) => {
  const { classes } = useStyles()
  return (
    <Container>
      <Grid gutter={40}>
        {blogs.map((item) => (
          <Grid.Col key={item._id} sm={6}>
            <Link href={`/blog/${item._id}`} passHref>
              <div className={classes.postsWrapper}>
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
