import React from "react";
import styles from "./table.module.scss";

interface TableProps {
  headers: { label: string; key: string }[]; // headers de la tabla
  data: { [key: string]: any }[]; // datos de la tabla (celdas)
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header.key} className={styles.headerCell}>
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.row}>
                  {headers.map((header) => (
                    <td key={header.key} className={styles.cell}>
                      {row[header.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
export default Table;
