import { InventoryType } from '@/types/inventoryType';
import { ItemType } from '@/types/items';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Box, Group, Text, Grid, useMantineTheme } from '@mantine/core';
import React, { forwardRef, memo } from 'react';
import { useEffect, useState } from 'react';
import EventManager from 'src/eventmanager';
import Droppable from './Droppable';
import Item from './Item';
import Layout from './layout';
import SortableItem from './SortableItem';

interface Props {
  show: boolean;
}

function Inventory({ show }: Props) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [IsInspecting, setIsInspecting] = useState<boolean>(false);
  const [InspectingItem, setInspectingItem] = useState<ItemType | null>();
  const [inventory, setInventory] = useState<InventoryType[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const parentRef = React.useRef();
  const theme = useMantineTheme();
  const sensors = useSensors(useSensor(PointerSensor));

  const FindEmptySlot = () => {
    for (let index = 0; index < inventory.length; index++) {
      if (inventory[index].item === undefined) {
        console.log(inventory[index].item);
        return index;
      }
    }
    return null;
  };

  useEffect(() => {
    setInspectingItem(null);
    setIsInspecting(false);
    return () => {};
  }, [show]);

  type addItemProps = {
    id: number;
    name: string;
    image: string;
    func: string | null;
  };

  useEffect(() => {
    const addItem = ({ id, name, image, func }: addItemProps) => {
      console.log(
        `EventManager Working!!!: ID: ${JSON.stringify(
          id
        )} | Name: ${name} | image: ${image} | func: ${func}`
      );
      console.log('EmptySlot: ', `${FindEmptySlot()}`);
      const slot = FindEmptySlot();
      if (slot !== null) {
        const newData: ItemType = {
          name,
          id,
          image,
          func,
          description: 'werwer',
          amount: 1,
        };
        setInventory((prevInv) => {
          inventory[slot].item = newData;
          return inventory;
        });
        const tempData = items;
        tempData.push(newData);
        setItems(tempData);
      } else {
        console.log('Full Inventory');
      }
    };
    // setTimeout(() => {
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 2, name: 'AK47', image: 'weapon_assaultrifle', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    //   addItem({ id: 1, name: 'AP Pistol', image: 'weapon_appistol', func: null });
    // }, 500);
    EventManager.addHandler('addItem', addItem);
    return () => {
      EventManager.removeHandler('addItem', addItem);
    };
  }, []);

  useEffect(() => {
    for (let index = 0; index < 32; index++) {
      const tempInv: InventoryType = {
        id: index.toString(),
        item: undefined,
      };
      setInventory((prevInv) => {
        // const inv = inventory.findIndex((prevInv) => prevInv.id === index.toString());
        inventory[index] = tempInv;
        return inventory;
      });
    }

    return () => {
      // setInventory([]);
      setItems([]);
    };
  }, [setInventory, setItems]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    console.log('activeID:', active.id);
    console.log('overId:', over?.id);
    if (over && active.id !== over?.id) {
      setInventory((invSlot) => {
        const oldIndex = Number.parseInt(active.id);
        const movingItem = inventory[oldIndex].item;
        const newIndex = Number.parseInt(over.id);
        // const itemOldIndex = items.findIndex((item) => item.slot.toString() === active.id);
        // const itemNewIndex = items.findIndex((item) => item.slot.toString() === over.id);
        if (inventory[newIndex] != undefined) {
          inventory[oldIndex].item = inventory[newIndex].item;
          inventory[newIndex].item = movingItem;
          // items[itemNewIndex].slot = Number.parseInt(active.id);
          // items[itemOldIndex].slot = Number.parseInt(over.id);
          setActiveId(null);

          return inventory;
        }
        inventory[newIndex].item = inventory[oldIndex].item;
        inventory[oldIndex].item = undefined;
        // items[itemOldIndex].slot = Number.parseInt(over.id);
        setActiveId(null);

        return inventory;
      });
    }
    setActiveId(null);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    console.log('Darg start', active.id);
  };

  const getItem = (id: string) => {
    // const itemIndex = items.findIndex((item) => item.slot.toString() === id);
    const invSlot = inventory[Number.parseInt(id)].item;
    if (invSlot) {
      return (
        <Item
          name={invSlot.name}
          id={invSlot.id}
          description={invSlot.description}
          slot={Number.parseInt(id)}
          isDragging={true}
          amount={invSlot.amount}
          serial={invSlot.serial}
          getInspect={inspectItem}
          image={invSlot.image}
          getUse={useItem}
          func={invSlot.func}
        />
      );
    } else {
      return <div></div>;
    }

    return invSlot;
  };

  const inspectItem = (item: ItemType) => {
    setIsInspecting(true);
    setInspectingItem(item);
  };

  const useItem = (item: ItemType) => {
    console.log('Working!?!?', item);
    const { name, id, description } = item;
    // @ts-ignore
    mp.trigger('useItem', id, name, description);
  };

  return (
    <>
      {show ? (
        <Group
          style={{
            margin: '12px',
          }}
          direction="column"
        >
          <Layout>
            <Grid m={2} columns={4}>
              <DndContext
                sensors={sensors}
                collisionDetection={rectIntersection}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
              >
                {inventory.map(({ item }, index) => {
                  // const item = items[itemIndex];
                  return (
                    <Droppable key={index} id={index.toString()}>
                      {item ? (
                        <SortableItem
                          key={index}
                          name={item.name}
                          id={item.id}
                          description={item.description}
                          amount={item.amount}
                          serial={item.serial}
                          slot={Number.parseInt(inventory[index].id)}
                          getInspect={inspectItem}
                          image={item.image}
                          func={item.func}
                          getUse={useItem}
                        />
                      ) : (
                        <Text
                          key={index}
                          sx={{ padding: 0, marginLeft: 4, fontSize: 13 }}
                          weight={800}
                          color={theme.colors.dark[3]}
                        >
                          {index}
                        </Text>
                      )}
                    </Droppable>
                  );
                })}
                <DragOverlay>{activeId ? getItem(activeId) : null}</DragOverlay>
              </DndContext>
            </Grid>
          </Layout>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              hidden={!IsInspecting}
              style={{
                marginTop: '0px',
                width: '450px',
                height: '250px',
                borderRadius: '8px 8px 8px 8px ',
                backgroundColor: theme.colors.dark[4],
                outline: '2px',
                outlineColor: theme.colors.dark[9],
                outlineStyle: 'solid',
              }}
            >
              <Box>
                <Text>
                  Inspecting?:{' '}
                  {InspectingItem ? `${InspectingItem.name} : ${InspectingItem.id}` : null}
                </Text>
              </Box>
            </Box>
          </Box>
        </Group>
      ) : null}
    </>
  );
}

export default Inventory;
