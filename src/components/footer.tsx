import { createStyles } from '@mantine/core'
import React from 'react'
import { Sns } from './sns'

const useStyles = createStyles((theme) => ({
  border: {
    marginTop: 80,
    paddingTop: 50,
    paddingBottom: 40,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
}))

export const Footer = () => {
  const { classes } = useStyles()
  const date = new Date()
  const year = date.getFullYear()
  return (
    <div className={classes.border}>
      <div className='text-center'>
        <div className='mb-5'>
        </div>
        <div className='flex justify-center mb-6'>
          <Sns />
        </div>
        <p className='mb-6'>@{year} Shun&apos;s Blog All rights reserved</p>
      </div>
    </div>
  )
}
