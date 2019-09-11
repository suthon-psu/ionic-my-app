import { Item } from './item';

export interface Items {
  refresh?: boolean
  results: Item[]
  total: number
};