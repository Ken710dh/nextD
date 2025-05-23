'use client'
import React, { useEffect } from "react";
import { TableHeaderProps, TableProps } from "./type";
// import style css 
import styles from './styles.module.css';
export default function Table({ header, data, failedDataMessage, checked, handleAllItemSelect }: TableProps) {

  //check if the table has a vertical scroll
  const [isScrollY, setIsScrollY] = React.useState(false);

  useEffect(() => {
    const tbody = document.querySelector("tbody");
    if (tbody) {
      const isOverflow = tbody.scrollHeight > tbody.clientHeight;
      console.log(isOverflow)
      setIsScrollY(isOverflow ? true : false);
    }
  }, [data]);

  /**
   * when the scroll appears, this take a place to display there for style for 
   * th in thead was missaligned for td in tbody
   * so this function was handled to add padding to the last cell in the table
   * @param isLastCell boolean
   * @param header
   * @returns React.CSSProperties
   */
  const changeLastCellStyling = (isLastCell: boolean, header: TableHeaderProps): React.CSSProperties => {
    if (isScrollY && isLastCell) {
      return {
        paddingRight: "30px",
        boxSizing: "border-box",
        width: header.width ? `calc(${header.width} + 10.5px)` : "auto",
        ...(header.minWidth && {
          minWidth: `calc(${header.minWidth} + 10.5px)`,
        }),
        ...(header.maxWidth && {
          maxWidth: `calc(${header.maxWidth} + 10.5px)`,
        }),
      }
    } else {
      return {
        width: header.width ? header.width : "auto",
        ...(header.minWidth && {
          minWidth: header.minWidth,
        }),
        ...(header.maxWidth && {
          maxWidth: header.maxWidth,
        }),
      }
    }
  }

  const getCellStyling = (header: TableHeaderProps, isLastCell: boolean = false) => {
    console.log(changeLastCellStyling(isLastCell, header))
    return {
      ...changeLastCellStyling(isLastCell, header),
      flex: '0 0 auto',
      cursor: 'default',
    }
  }
  return (
    <table className={styles.container}>
      <thead className={styles.tableHeader}>
        <tr className={styles.tableRow}>
          {header.map((item, index) => (
            <th className={styles.tableHeaderCell} style={getCellStyling(item, header.length - 1 === index)} key={item.header}>
              {item.header === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleAllItemSelect}
                />
              ) : (
                item.isCellTable ? item.cellTable : item.label
              )}
            </th>))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data ? data.map((item, index) => (
          <tr className={styles.tableRow} key={index}>
            {header.map((key, index) => (
              <td className={styles.tableItem} style={getCellStyling(key)} key={index}>
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