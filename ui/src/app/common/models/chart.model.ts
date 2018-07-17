/**
 * The model represents a chart.
 */
export interface Chart {
    attributes: string,
    createdAt?: Array<number>,
    dataSourceDbRepId: number,
    filterColumns: string,
    id?: number,
    name: string,
    order: number,
    query: string,
    type: string,
    updatedAt: Array<number>,
    visibleColumns: string
}