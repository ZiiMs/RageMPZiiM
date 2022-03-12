import { Box, Group, ScrollArea, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';
import Header from './header';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}
    >
      <Box
        style={{
          // margin: '12px',

          borderRadius: '8px 8px 8px 8px ',
          backgroundColor: theme.colors.dark[7],
          outline: '2px',
          outlineColor: theme.colors.dark[9],
          outlineStyle: 'solid',
        }}
      >
        <Header />
        <ScrollArea
          type="auto"
          scrollbarSize={10}
          styles={{
            root: {
              color: 'red',
              width: '450px',
              height: '250px',
              margin: '0px',
              padding: '0',
            },
            thumb: {
              backgroundColor: `${theme.colors.dark[9]} !important`,
            },
            scrollbar: {
              '&:hover': {
                backgroundColor: theme.colors.dark[7],
              },
            },
          }}
        >
          <Box
            style={{
              margin: '2px',
            }}
          >
            {children}
          </Box>
        </ScrollArea>
      </Box>
      {/* <Box
          style={{
            marginTop: '0px',
            width: '100%',
            height: '250px',
            borderRadius: '8px 8px 8px 8px ',
            backgroundColor: theme.colors.dark[4],
            outline: '2px',
            outlineColor: theme.colors.dark[9],
            outlineStyle: 'solid',
          }}
        ></Box> */}
    </Box>
  );
};

export default Layout;
