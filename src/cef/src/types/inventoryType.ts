import { ItemType } from './items';
import { ReactNode } from 'react';

export interface InventoryType {
  hotkey?: string;
  id: string;
  item?: ItemType;
}

export interface GridType {
  id: string;
  children?: ReactNode;
}
