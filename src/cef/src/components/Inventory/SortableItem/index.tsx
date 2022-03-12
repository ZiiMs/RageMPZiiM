import { ItemType } from '@/types/items';
import { useDraggable } from '@dnd-kit/core';
import { CSSProperties } from 'react';
import Item from '../Item';

interface Props extends ItemType {
  getInspect: any;
  slot: number;
  getUse: any;
}

const SortableItem = ({
  id,
  slot,
  getInspect,
  getUse,
  amount,
  name,
  description,
  image,
  func,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: slot.toString(),
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0 : 1,
    zIndex: isDragging ? 100 : 1,
    height: isDragging ? '75%' : '100%',
    width: isDragging ? '75%' : '100%',
    backgroundColor: 'transparent',

    justifyContent: 'center',
    alignItems: ' center',
  };

  return (
    <Item
      getInspect={getInspect}
      key={slot}
      amount={amount}
      ref={setNodeRef}
      name={name}
      description={description}
      slot={slot}
      isDragging={isDragging}
      listeners={listeners}
      attributes={attributes}
      image={image}
      getUse={getUse}
      style={style}
      func={func}
      id={id}
    />
  );
};

export default SortableItem;
