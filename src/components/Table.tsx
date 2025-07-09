import { useTableValue, useOriginalTableValue } from "../stores/tableAtoms";
import { TableRow } from "./TableRow";
import { sumRow, calculateVariance } from "../utils/tableUtils";

export const Table = () => {
  const table = useTableValue();
  const originalTable = useOriginalTableValue();

  const grandTotal = table.rows.reduce((sum, row) => sum + sumRow(row), 0);
  const originalGrandTotal = originalTable.rows.reduce(
    (sum, row) => sum + sumRow(row),
    0
  );
  const variance = calculateVariance(grandTotal, originalGrandTotal);

  return (
    <div className="px-4">
    <div className="overflow-x-auto border border-gray-200 rounded-md container mx-auto">
      <table className="min-w-full divide-y divide-gray-200  shadow-sm overflow-hidden">
        <thead className="bg-gray-50 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-2 text-left">Label</th>
            <th className="px-4 py-2 text-right">Value</th>
            <th className="px-4 py-2 text-center">Input</th>
            <th className="px-4 py-2 text-center">Allocation %</th>
            <th className="px-4 py-2 text-center">Allocation Val</th>
            <th className="px-4 py-2 text-right">Variance %</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800 divide-y divide-gray-100">
          {table.rows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              originalRow={originalTable.rows.find((r) => r.id === row.id)}
              level={0}
            />
          ))}
        </tbody>
        <tfoot className="bg-gray-100 text-sm font-medium text-gray-900">
          <tr>
            <td className="px-4 py-2 text-left">Grand Total</td>
            <td className="px-4 py-2 text-right">{grandTotal}</td>
            <td colSpan={3}></td>
            <td className="px-4 py-2 text-right">
              {variance === 0 ? "0%" : `${variance > 0 ? "+" : ""}${variance}%`}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    </div>
  );
};
