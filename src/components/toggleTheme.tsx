import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { Sun, MoonStars } from 'tabler-icons-react'

export const Toggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  console.log(colorScheme)
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      variant='outline'
      color={dark ? 'orange' : 'blue'}
      onClick={() => toggleColorScheme()}
      title='Toggle color scheme'
    >
      {dark ? <Sun size={20} /> : <MoonStars size={20} />}
    </ActionIcon>
  )
}
