export interface HeaderRowInterface {
  text: string;
}

export interface TableComponentPropsInterface {
  numberOfRows: number;
  headerRow: HeaderRowInterface[];
  tableData: HeaderRowInterface[][];
  callback(): any;
}
