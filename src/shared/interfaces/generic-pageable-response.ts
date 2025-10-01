export interface GenericPageableResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}