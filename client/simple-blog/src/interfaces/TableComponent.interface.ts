export interface HeaderRowInterface {
  text: string;
}

export interface TableComponentPropsInterface {
  pagesNumber: number;
  headerRow: HeaderRowInterface[];
  tableData: HeaderRowInterface[][];
  isLoading: boolean;
  callback(page: string | number | undefined): any;
}
