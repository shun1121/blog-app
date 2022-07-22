import { createStyles } from '@mantine/core'
import Link from 'next/link'

type Pagenation = {
  currentPageNum: number
  maxPageNum: number
}

const useStyles = createStyles((theme) => ({
  buttonWrapper: {
    marginTop: '50px',
    marginRight: '135px',
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
  hideButton: {
    visibility: 'hidden',
  },
}))

export const Pagination = ({ currentPageNum, maxPageNum }: Pagenation) => {
  const { classes } = useStyles()
  const prevPage = currentPageNum - 1
  const nextPage = currentPageNum + 1

  return (
    <div className='mt-10 mb-10'>
      <div className='mx-auto flex items-center justify-between max-w-[930px]'>
        <div className={currentPageNum !== 1 ? classes.button : classes.hideButton}>
          <Link href={`/blog/page/${prevPage}`}>
            <a className='flex w-full h-full justify-center items-center font-bold'>戻る</a>
          </Link>
        </div>
        <div className={currentPageNum !== maxPageNum ? classes.button : classes.hideButton}>
          <Link href={`/blog/page/${nextPage}`}>
            <a className='flex w-full h-full justify-center items-center font-bold'>次へ</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
