// Paginated response type
export interface PaginatedResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    data: T[];
}
