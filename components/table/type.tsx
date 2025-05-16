/*
* Interface for return the table type props
*/ 
export interface TableProps {
  header : TableHeaderProps[];
  data: RowData[];
  border?: string;
  failedDataMessage?: string;
}

/**
 * Interface for return the table header type props
 */
export interface TableHeaderProps {
  header: string ;
  width?: string;
  isCellTable?: boolean;
  label?: string;
  cellTable?: React.ReactNode[]
}

/**
 * Interface for return the table data type props
 */
export interface RowData{
  [key: string]: React.ReactNode | Record<string, string | number | boolean | null>;
}