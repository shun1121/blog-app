import { Header, Container } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { Toggle } from './toggleTheme'

export const HeaderResponsive: FC = () => {
  return (
    <Header height={80} mb={80} className=''>
      <Container className='flex justify-between items-center h-full'>
        <Link href='/'>
          <a className='font-bold text-xl'>
            <Image src='/images/logo.png' alt='' width={140} height={40} />
          </a>
        </Link>
        <div className='flex space-x-2'>
          <Toggle />
        </div>
      </Container>
    </Header>
  )
}
