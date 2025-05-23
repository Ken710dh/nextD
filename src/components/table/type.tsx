/*
* Interface for return the table type props
*/ 
export interface TableProps {
  header : TableHeaderProps[];
  data: RowData[];
  border?: string;
  failedDataMessage?: string;
  checked?: boolean
  handleAllItemSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleItemChange?: (item: string) => void
}

/**
 * Interface for return the table header type props
 */
export interface TableHeaderProps {
  header: string ;
  width?: string;
  isCellTable?: boolean;
  minWidth?: string;
  maxWidth?: string;
  label?: string;
  cellTable?: React.ReactNode[]
}

/**
 * Interface for return the table data type props
 */
export interface RowData{
  [key: string]: React.ReactNode | Record<string, string | number | boolean | null>;
}