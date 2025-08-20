import React from "react";

export interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface ProfileTableProps {
  columns: Column[];
  data: any[];
}

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

const ProfileTable: React.FC<ProfileTableProps> = ({ columns, data }) => {
  return (
    <div className="w-full overflow-hidden border bg-bg-paper rounded-xl border-text-dark/10">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-white bg-primary">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-primary/5">
                {columns.map((col) => {
                  const value = getNestedValue(row, col.key);
                  return (
                    <td key={col.key} className="px-4 py-3 border-t border-text-dark/5">
                      {col.render ? col.render(value, row) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-4 text-center text-text-dark/60">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
