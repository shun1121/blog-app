import { createStyles } from '@mantine/core';
import Link from 'next/link'
import React from 'react';
import { RiGithubLine, RiTwitterLine } from "react-icons/ri"

const useStyles = createStyles((theme) => ({
  border: {
    marginTop: 160,
    paddingTop: 40,
    paddingBottom: 30,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]}`,
  },
}))

export const Sns = () => {
  const { classes } = useStyles();
  return (
    // <div>
    <div className='flex space-x-4'>
      <Link href="https://github.com/shun1121">
        <a target="_blank" rel="noopener">
          <RiGithubLine className='h-6 w-6' />
        </a>
      </Link>
      <Link href="https://twitter.com/Shunsuk87072477">
        <a target="_blank" rel="noopener">
          <RiTwitterLine className='h-6 w-6' />
        </a>
      </Link>
    </div>
  )
}
