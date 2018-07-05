/**
 * HTTP params for getting data source list
 */
export interface DataSourcesParams {
    sortBy?: string;
    direction?: string;
    pageSize?: number;
    page?: number;
    query?: string;
}