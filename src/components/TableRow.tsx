import { useState } from 'react';
import { useAtom } from 'jotai';
import { tableAtom, useOriginalTableValue, type TableRow as TableRowType,  } from '../stores/tableAtoms';
import { updateRowValue, updateRowByPercent, calculateVariance } from '../utils/tableUtils';

interface TableRowProps {
  row: TableRowType;
  originalRow: TableRowType | undefined;
  level?: number;
}

const findOriginalRow = (row: TableRowType, original: TableRowType | undefined): TableRowType | undefined => {
  if (!original) return undefined;
  if (row.id === original.id) return original;
  if (original.children) {
    for (const child of original.children) {
      const found = findOriginalRow(row, child);
      if (found) return found;
    }
  }
  return undefined;
}

export const TableRow = ({ row, originalRow, level = 0 }: TableRowProps) => {
  const [input, setInput] = useState('');
  const [table, setTable] = useAtom(tableAtom);
  const originalTable = useOriginalTableValue();

  const orig = originalRow || findOriginalRow(row, originalTable.rows.find(r => r.id === row.id));
  const variance = orig ? calculateVariance(row.value, orig.value) : 0;

  const handleAllocPercent = () => {
    const percent = parseFloat(input);
    if (isNaN(percent)) return;
    setTable(updateRowByPercent(table, row.id, percent));
    setInput('');
  };

  const handleAllocValue = () => {
    const value = parseFloat(input);
    if (isNaN(value)) return;
    setTable(updateRowValue(table, row.id, value));
    setInput('');
  };

  return (
    <>
      <tr>
        <td className={`px-4 py-2 whitespace-nowrap`} >
          {level > 0 && <span className="mr-2">{'--'.repeat(level)}</span>}
          {row.label}
        </td>
        <td className="px-4 py-2 text-right">{row.value}</td>
        <td className="px-4 py-2">
          <input
            type="number"
            className="border rounded px-1 py-0.5 w-30 text-center flex m-auto"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Value/%"
            min="0"
          />
        </td>
        <td className="px-4 py-1">
          <button
            className="w-full  text-black px-4 py-2rounded mr-1"
            onClick={handleAllocPercent}
            title="Allocation %"
          >
            %
          </button>
        </td>
        <td className="px-4 py-1">
          <button
            className="w-full text-black px-4 py-2rounded"
            onClick={handleAllocValue}
            title="Allocation Val"
          >
            Val
          </button>
        </td>
        <td className="px-4 py-2  text-right">
          {variance === 0 ? '0%' : `${variance > 0 ? '+' : ''}${variance}%`}
        </td>
      </tr>
      {row.children && row.children.map(child => (
        <TableRow
          key={child.id}
          row={child}
          originalRow={orig?.children?.find(c => c.id === child.id)}
          level={level + 1}
        />
      ))}
    </>
  );
}; 