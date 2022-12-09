import { Avatar, Text, Group, useMantineColorScheme } from '@mantine/core'
import React from 'react'
import { UserInfoIconsProps } from '../types/profile'
import { Sns } from './sns'
import clsx from 'clsx'

export const Profile = ({ avatar, name, title }: UserInfoIconsProps) => {
  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === "light"
  return (
    <div className='mt-10'>
      <Group noWrap className={clsx("bg-dark-6 border border-dark-7 p-[40px] rounded-[10px]", {
        "bg-gray-10 border-gray-10": light
      })}>
        <Avatar src={avatar} size={94} radius='md' />
        <div className='ml-3'>
          <Text size='xs' sx={{ textTransform: 'uppercase' }} weight={700} color='dimmed'>
            {title}
          </Text>
          <Text size='lg' weight={500}>
            {name}
          </Text>
          <Sns />
        </div>
      </Group>
    </div>
  )
}
