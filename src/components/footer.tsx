import { useMantineColorScheme } from '@mantine/core'
import React, { FC } from 'react'
import { Sns } from './sns'
import clsx from 'clsx'

export const Footer: FC = () => {
  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === "light"
  const date = new Date()
  const year = date.getFullYear()
  
  return (
    <div className={clsx("pt-[20px] pb-40px border-[1px] border-dark-7 bg-dark-7", {
      "bg-gray-10 border-[1px] border-gray-3" : light
    })}>
      <div className='text-center'>
        <div className='mb-5'></div>
        <div className='flex justify-center mb-6'>
          <Sns />
        </div>
        <p className='mb-6'>@{year} Shun&apos;s Blog</p>
      </div>
    </div>
  )
}
