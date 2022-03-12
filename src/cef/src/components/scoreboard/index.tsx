import { Box, Pagination, Table, useMantineTheme } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import EventManager from 'src/eventmanager';

interface Props {
  show: boolean;
}
type Players = {
  name: string;
  id: number;
  rgscid: string;
};

// const setupData = () => {
//   const returnData: Players[] = [];
//   // eslint-disable-next-line no-plusplus
//   for (let i = 1; i < 63; i++) {
//     const name = `Test${i}`;
//     const id = i;
//     let rgscid = '';
//     for (var letter = 1; letter <= 8; letter++) {
//       rgscid +=
//         letter % 2 == 0
//           ? String.fromCharCode(Math.random() * (91 - 65) + 65)
//           : Math.ceil(Math.random() * 9);
//     }
//     const tempData: Players = { name, rgscid, id };
//     returnData.push(tempData);
//   }
//   return returnData;
// };

const Scoreboard = ({ show }: Props) => {
  const [current, setCurrent] = useState<number>(1);
  const pageSize = 15;
  const offset = (current - 1) * pageSize;
  const theme = useMantineTheme();
  const [data, setData] = useState<Players[]>([]);
  const total = Math.ceil(data.length / pageSize);
  const posts = data.slice(offset, offset + pageSize);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && show === true) {
        e.preventDefault();
        const page = current + 1;
        setCurrent(Math.min(Math.max(page, 1), Math.ceil(data.length / pageSize)));
      } else if (e.key === 'ArrowLeft' && show === true) {
        e.preventDefault();
        const page = current - 1;
        setCurrent(Math.min(Math.max(page, 1), Math.ceil(data.length / pageSize)));
      }
    },
    [show, current, data.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [current, data, show, handleKeyPress]);

  useEffect(() => {
    const insert = ({ id, name, rgscid }: Players) => {
      console.log(
        `EventManager Working!!!: ID: ${JSON.stringify(id)} | Name: ${name} | RGSCID: ${rgscid}`
      );
      const newData: Players = { name, id, rgscid };
      const tempData = data;
      tempData.push(newData);
      const sorted = [...tempData].sort((a, b) => a.id - b.id);
      setData(sorted);
    };
    EventManager.addHandler('insert', insert);

    return () => {
      EventManager.removeHandler('insert', insert);
    };
  }, []);

  return (
    <>
      {show ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '12px',
          }}
        >
          <Box
            style={{
              backgroundColor: theme.colors.dark[7],
              borderRadius: '8px',
            }}
          >
            <Table
              horizontalSpacing={'lg'}
              captionSide="bottom"
              style={{
                borderCollapse: 'initial',
                minWidth: '300px',
              }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>SCID</th>
                </tr>
              </thead>
              <tbody
                style={{
                  backgroundColor: theme.colors.dark[6],
                }}
              >
                {posts.map((element) => (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.rgscid}</td>
                  </tr>
                ))}
              </tbody>
              <caption>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <Pagination
                    page={current}
                    onChange={(page) => {
                      if (page != undefined) {
                        setCurrent(page);
                      }
                    }}
                    initialPage={1}
                    total={total}
                  />
                </Box>
              </caption>
            </Table>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default Scoreboard;
