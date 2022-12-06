import Link from 'next/link'
import React from 'react'
import { RiGithubLine, RiTwitterLine } from 'react-icons/ri'

export const Sns = () => {
  return (
    <div className='flex space-x-4 my-1'>
      <Link href='https://github.com/shun1121'>
        <a target='_blank' rel='noopener' className="w-[24px] h-[24px]">
          <RiGithubLine className="w-[24px] h-[24px] hover:w-[26px] hover:h-[26px]" />
        </a>
      </Link>
      <Link href='https://twitter.com/Shunsuk87072477'>
        <a target='_blank' rel='noopener' className="w-[24px] h-[24px]">
          <RiTwitterLine className="w-[24px] h-[24px] hover:w-[26px] hover:h-[26px]" />
        </a>
      </Link>
    </div>
  )
}
