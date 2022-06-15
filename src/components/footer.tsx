import Link from 'next/link'
import React from 'react';
import { RiGithubLine, RiTwitterLine } from "react-icons/ri"


export const Footer = () => {
  const date = new Date
  const year = date.getFullYear()
  console.log(year)
  return (
    <div className='w-full mt-32 mb-10 pt-10 border-t border-primary'>
      <div className='text-center'>
        <div className='mb-6'>
          <Link href="/">
            <a>
              Privacy Policy
            </a>
          </Link>
        </div>
        <div className='flex justify-center mb-6 space-x-4'>
          <Link href="">
            <a target="_blank" rel="noopener">
              <RiGithubLine className='h-6 w-6' />
            </a>
          </Link>
          <Link href="">
            <a target="_blank" rel="noopener">
              <RiTwitterLine className='h-6 w-6' />
            </a>
          </Link>
        </div>
        <p className='mb-6'>@{year} Shun&apos;s Blog All rights reserved</p>
      </div>
    </div>
  )
}
