/*
* Interface for return the table type props
*/ 
export interface TableProps {
  header : TableHeaderProps[];
  data: RowData[];
  border?: string;
  failedDataMessage?: string;
}

type RowValue = string | number | React.ReactElement;
/**
 * Interface for return the table header type props
 */

export type TableHeaderProps<TRow extends Record<string, RowValue> = Record<string, RowValue>> = {
  header: string;
  label?: string;
  width?: string;
  isCellTable?: boolean;
  cellTable?: React.ReactNode;
  render?: (value: RowValue, row: TRow) => React.ReactNode;
};

/**
 * Interface for return the table data type props
 */
export interface RowData{
  [key: string]: React.ReactNode | Record<string, string | number | boolean | null>;
}