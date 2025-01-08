import { PaginatedResponse } from '../common';

export const EMPTY_PAGINATED_RESPONSE: PaginatedResponse<never> = {
  data: [],
  itemCount: 0,
  pageCount: 0,
  pages: [],
};
