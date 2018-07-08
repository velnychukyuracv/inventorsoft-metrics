/**
 * HTTP params for getting data for showing into table
 */
export interface TableParams {
    sortBy?: string;
    direction?: string;
    pageSize?: number;
    page?: number;
    query?: string;
}