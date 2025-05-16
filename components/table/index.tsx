'use client'
import React, { useEffect } from "react";
import { TableProps } from "./type";
// import style css 
import styles from './styles.module.css';
export default function Table({ header, data, failedDataMessage }: TableProps) {
  const [isScrollY, setIsScrollY] = React.useState(false);

useEffect(() => {
  const tbody = document.querySelector("tbody");
  if (tbody) {
    const isOverflow = tbody.scrollHeight > tbody.clientHeight;
    setIsScrollY(isOverflow);
  }
}, [data]);
  return (
    <table className={styles.container}>
      <thead className={styles.tableHeader}>
        <tr className={styles.tableRow}>
          {header.map((item) => (
            <th className={styles.tableHeaderCell} style={{  width: item.width ?? "100px" }} key={item.header}>
              {item.isCellTable ? item.cellTable : item.label}
            </th>))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data ? data.map((item, index) => (
          <tr className={styles.tableRow} key={index}>
            {header.map((key, index) => (
              <td className={styles.tableItem} style={{ width: key.width ?? "100px",
                paddingRight: isScrollY && index === header.length - 1 ? "17px" : undefined
               }} key={index}>
                {item[key.header] as React.ReactNode}
              </td>
            ))}
          </tr>
        )) : (
          <div>
            <p>{failedDataMessage}</p>
          </div>
        )}
      </tbody>
    </table >
  )
}