import { GridType } from '@/types/inventoryType';
import { useDroppable } from '@dnd-kit/core';
import { Box, Grid, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';

const Droppable = (props: GridType) => {
  const theme = useMantineTheme();
  const [color, setColor] = useState(theme.colors.dark[8]);
  const { isOver, setNodeRef, active } = useDroppable({
    id: props.id,
  });

  useEffect(() => {
    if (active) {
      setColor(theme.colors.dark[8]);
    }
  }, [active]);

  return (
    <Grid.Col
      span={6}
      m={4}
      style={{
        backgroundColor: color,
        margin: '4px',
        padding: '0',
        width: '100px',
        height: '100px',
      }}
    >
      <Box
        ref={setNodeRef}
        m={0}
        onMouseEnter={() => setColor(theme.colors.dark[9])}
        onMouseLeave={() => setColor(theme.colors.dark[8])}
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: isOver ? 'green' : undefined,
        }}
      >
        {props.children}
      </Box>
    </Grid.Col>
  );
};

export default Droppable;
