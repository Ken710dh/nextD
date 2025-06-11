'use client'
import React, { useEffect } from "react";
import { TableHeaderProps, TableProps } from "./type";
import styles from './styles.module.css';
import CustomCheckbox from "../checkbox";
import { BoxIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
/**
 * Scrollable table component with sticky headers and "select all" functionality.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode[]} props.header - The header cells of the table
 * @param {Object[]} props.data - The data to display in the table rows
 * @param {string} props.failedDataMessage - Message to show when no data is available
 * @param {boolean} props.checked - Whether all items are currently selected
 * @param {(checked: boolean) => void} props.handleAllItemSelect - Callback for toggling all checkboxes
 * @returns {React.ReactNode} Rendered table component
 */
export default function Table({ header, data, failedDataMessage, checked, handleAllItemSelect, }: TableProps) {

  //check if the table has a vertical scroll
  const [isScrollY, setIsScrollY] = React.useState(false);

  useEffect(() => {
    const tbody = document.querySelector("tbody");
    if (tbody) {
      const isOverflow = tbody.scrollHeight > tbody.clientHeight;
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
                <CustomCheckbox
                  checked={checked}
                  onCheckedChange={handleAllItemSelect}
                />
              ) : (
                item.isCellTable ? item.cellTable : item.label
              )}
            </th>))}
        </tr>
      </thead>

      <tbody className={styles.tableBody}>
        {data && data.length > 0 ? data.map((item: any, rowIndex: number) => {
          const isLastRow = rowIndex === data.length - 1;
          return (
            <tr
              className={styles.tableRow}
              style={isLastRow && isScrollY  ? { borderBottom: "none" } : undefined}
              key={rowIndex}
            >
              {header.map((key: TableHeaderProps, colIndex: number) => (
                <td className={styles.tableItem} style={getCellStyling(key)} key={colIndex}>
                  {item[key.header] as React.ReactNode}
                </td>
              ))}
            </tr>
          );
        }) : (
                <tr className="p-6 text-center text-gray-600 h-full bg-gray-50 shadow-sm flex items-center justify-center">
                  <td className="flex flex-col items-center mb-4 py-4 px-4 w-[fit-content] h-[fit-content] border border-dashed rounded-xl">
                    <BoxIcon className="w-6 h-6 text-yellow-400" />
                    <p className="text-lg font-medium">{failedDataMessage}</p>
                  </td>
                </tr>
        )}
      </tbody>
    </table >
  )
}