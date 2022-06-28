import { createStyles } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { RiGithubLine, RiTwitterLine } from 'react-icons/ri'

const useStyles = createStyles((theme) => ({
  icon: {
    width: '1.5rem',
    height: '1.5rem',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },
  },
}))

export const Sns = () => {
  const { classes } = useStyles()
  return (
    <div className='flex space-x-4'>
      <Link href='https://github.com/shun1121'>
        <a target='_blank' rel='noopener'>
          <RiGithubLine className={classes.icon} />
        </a>
      </Link>
      <Link href='https://twitter.com/Shunsuk87072477'>
        <a target='_blank' rel='noopener'>
          <RiTwitterLine className={classes.icon} />
        </a>
      </Link>
    </div>
  )
}
