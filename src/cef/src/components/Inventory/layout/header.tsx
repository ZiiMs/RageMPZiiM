import { Box, CloseButton, Divider, Group, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

const Header = ({ ...props }) => {
  const [name, setName] = useState('ZiiM_Test');
  const theme = useMantineTheme();

  return (
    <Box
      {...props}
      style={{
        backgroundColor: `${theme.colors.dark[9]}`,
        borderRadius: '7px 7px 0 0 ',
      }}
    >
      <Group
        direction="row"
        position="apart"
        style={{
          marginLeft: '24px',
          marginRight: '24px',
          padding: '8px',
        }}
      >
        <Text>{name}</Text>
        <CloseButton />
      </Group>
      <Divider size={'sm'} />
    </Box>
  );
};

export default Header;
