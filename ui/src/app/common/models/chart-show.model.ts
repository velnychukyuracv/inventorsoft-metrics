/**
 * The model represents a chart.
 */
export interface ChartShow {
    type: string,
    data: Array<number>,
    options: {
        title: string,
        curveType: string,
        is3D: boolean,
        columns: Array<number>,
        width: string,
        type: string,
    }
}