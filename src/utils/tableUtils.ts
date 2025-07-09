import type { TableData, TableRow } from '../stores/tableAtoms';

export const findRowById = (
  rows: TableRow[],
  id: string,
  parent: TableRow | null = null
): { row: TableRow | null; parent: TableRow | null } => {
  for (const row of rows) {
    if (row.id === id) return { row, parent };
    if (row.children) {
      const found = findRowById(row.children, id, row);
      if (found.row) return found;
    }
  }
  return { row: null, parent: null };
}

export const sumRow = (row: TableRow): number => {
  if (!row.children || row.children.length === 0) return row.value;
  return row.children.reduce((sum, child) => sum + sumRow(child), 0);
}

export const updateRowValue = (
  data: TableData,
  id: string,
  newValue: number
): TableData => {
  const clone = structuredClone(data);
  const { row, parent } = findRowById(clone.rows, id);
  if (!row) return data;
  if (row.children && row.children.length > 0) {
    distributeValueToChildren(row, newValue);
    row.value = sumRow(row);
  } else {
    row.value = newValue;
    if (parent) parent.value = sumRow(parent);
  }
  recalcAllParentSubtotals(clone.rows, id);
  return clone;
}

export const updateRowByPercent = (
  data: TableData,
  id: string,
  percent: number
): TableData => {
  const clone = structuredClone(data);
  const { row, parent } = findRowById(clone.rows, id);
  if (!row) return data;
  const newValue = Math.round((row.value + (row.value * percent) / 100) * 100) / 100;
  if (row.children && row.children.length > 0) {
    distributeValueToChildren(row, newValue);
    row.value = sumRow(row);
  } else {
    row.value = newValue;
    if (parent) parent.value = sumRow(parent);
  }
  recalcAllParentSubtotals(clone.rows, id);
  return clone;
}

export const distributeValueToChildren = (row: TableRow, newValue: number) => {
  if (!row.children || row.children.length === 0) return;
  const oldTotal = sumRow(row);
  if (oldTotal === 0) {
    const equal = Math.round((newValue / row.children.length) * 100) / 100;
    row.children.forEach((child) => {
      if (child.children && child.children.length > 0) {
        distributeValueToChildren(child, equal);
        child.value = sumRow(child);
      } else {
        child.value = equal;
      }
    });
  } else {
    row.children.forEach((child) => {
      const proportion = sumRow(child) / oldTotal;
      const childValue = Math.round((newValue * proportion) * 100) / 100;
      if (child.children && child.children.length > 0) {
        distributeValueToChildren(child, childValue);
        child.value = sumRow(child);
      } else {
        child.value = childValue;
      }
    });
  }
}

export const recalcAllParentSubtotals = (rows: TableRow[], id: string): void => {
  const findPath = (rows: TableRow[], id: string, path: TableRow[] = []): TableRow[] => {
    for (const row of rows) {
      if (row.id === id) return [...path, row];
      if (row.children) {
        const childPath = findPath(row.children, id, [...path, row]);
        if (childPath.length) return childPath;
      }
    }
    return [];
  }
  const path = findPath(rows, id);
  for (let i = path.length - 2; i >= 0; i--) {
    const parent = path[i];
    parent.value = sumRow(parent);
  }
}

export const calculateVariance = (current: number, original: number): number => {
  if (original === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - original) / original) * 10000) / 100;
} 