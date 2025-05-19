'use client'
import React, { useEffect } from "react";
import { TableHeaderProps, TableProps } from "./type";
// import style css 
import styles from './styles.module.css';
export default function Table({ header, data, failedDataMessage }: TableProps) {
  const [isScrollY, setIsScrollY] = React.useState(false);
  const tableRef = React.createRef<HTMLTableElement>();

  const getColumnWidth = (percent: string, extra = 15): string => {
  if (!tableRef.current) return percent;

  const tableWidth = tableRef.current.offsetWidth;
  const numeric = parseFloat(percent);
  if (percent.includes('%')) {
    const widthPx = (tableWidth * numeric) / 100 + extra;
    return `${widthPx}px`;
  }
  return `calc(${percent} + ${extra}px)`; // fallback if it's px or calc already
};

useEffect(() => {
  const tbody = document.querySelector("tbody");
  if (tbody) {
    const isOverflow = tbody.scrollHeight > tbody.clientHeight;
    setIsScrollY(isOverflow? true: false);
    console.log(isOverflow)
  }
}, [data]);

/**
 * This function was check if the scrollbar is visible then 
 * set the last cell width to suit with srollbar size 
 */

const getCellStyle =(header: TableHeaderProps, isLastCell: boolean = false) => {
  return {
    ...setLastCellWidth(header, isLastCell),
    flex: '0 0 auto',
    cursor: 'default'
  }
}
const setLastCellWidth = (header: TableHeaderProps, isLastCell: boolean): React.CSSProperties => {
  if (isLastCell && isScrollY) {
    console.log(header.width)
    return {
      paddingRight: '32px',
      boxSizing: 'border-box',
      width: header.width ? `calc(${header.width} + 8px)`: 'auto'
    }
  } else{
    return {
      width: header.width? header.width: 'auto'
    }
  }
  
} 
  return (
    <div className={styles.wrapperTable}>
    <table className={styles.container}>
      <thead className={styles.tableHeader}>
        <tr className={styles.tableRow}>
          {header.map((item, index) => (
            <th className={styles.tableHeaderCell} style={getCellStyle(item, header.length - 1 === index)} key={item.header}>
              {item.isCellTable ? item.cellTable : item.label}
            </th>))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data ? data.map((item, index) => (
          <tr className={styles.tableRow} key={index}>
            {header.map((key, index) => (
              <td className={styles.tableItem} style={getCellStyle(key)} key={index}>
                {item[key.header] == null  && <img src="/assets/Label.svg" alt="checkbox"></img>}
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
    </div>
  )
}