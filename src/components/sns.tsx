import Link from 'next/link'
import React from 'react'
import { RiGithubLine, RiTwitterLine } from 'react-icons/ri'

export const Sns = () => {
  return (
    <div className='flex space-x-4'>
      <Link href='https://github.com/shun1121'>
        <a target='_blank' rel='noopener'>
          <RiGithubLine className='h-6 w-6' />
        </a>
      </Link>
      <Link href='https://twitter.com/Shunsuk87072477'>
        <a target='_blank' rel='noopener'>
          <RiTwitterLine className='h-6 w-6' />
        </a>
      </Link>
    </div>
  )
}
