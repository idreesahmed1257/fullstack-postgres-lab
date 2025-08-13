import React from "react";
import styles from "./profileTable.module.scss";

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
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => {
                  const value = getNestedValue(row, col.key);
                  return <td key={col.key}>{col.render ? col.render(value, row) : value}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
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
