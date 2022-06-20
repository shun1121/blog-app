import { createStyles, Avatar, Text, Group } from '@mantine/core';
import React from 'react';
import { Sns } from './sns';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },
  container: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    padding: 40,
    borderRadius: "10px",
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  title: string;
}

export const Profile = ({ avatar, name, title }: UserInfoIconsProps) => {
  const { classes } = useStyles();
  return (
    <div className='mt-10'>
      <Group noWrap className={classes.container}>
        <Avatar src={avatar} size={94} radius="md" />
        <div className='ml-3'>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {title}
          </Text>
          <Text size="lg" weight={500} className={classes.name}>
            {name}
          </Text>
          <Sns />
        </div>
      </Group>
    </div>
  );
}
