import { atom, useAtomValue } from 'jotai';

export type TableRow = {
  id: string;
  label: string;
  value: number;
  children?: TableRow[];
};

export type TableData = {
  rows: TableRow[];
};

const initialTableData: TableData = {
  rows: [
    {
      id: 'electronics',
      label: 'Electronics',
      value: 1500,
      children: [
        { id: 'phones', label: 'Phones', value: 800 },
        { id: 'laptops', label: 'Laptops', value: 700 },
      ],
    },
    {
      id: 'furniture',
      label: 'Furniture',
      value: 1000,
      children: [
        { id: 'tables', label: 'Tables', value: 300 },
        { id: 'chairs', label: 'Chairs', value: 700 },
      ],
    },
  ],
};

export const originalTableAtom = atom<TableData>(initialTableData);
export const useOriginalTableValue = () => useAtomValue(originalTableAtom);

export const tableAtom = atom<TableData>(initialTableData);
export const useTableValue = () => useAtomValue(tableAtom);