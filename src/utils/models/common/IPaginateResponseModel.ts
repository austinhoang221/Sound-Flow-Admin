export interface IPaginateResponseModel<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  numberOfRecords: number;
  totalRecords: number;
  content: T[];
}
