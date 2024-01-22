export interface TableToolbar {
  totalDataCount?: boolean;
  search?: boolean;
  limit?: boolean;
}

export interface  ColumnPropertiesInterface {
  display: boolean;
  order: number;
  header?: string;
  propName?: string;
  sorting?: boolean;
  component?: any;
  pipes?: Array<any>;
}
