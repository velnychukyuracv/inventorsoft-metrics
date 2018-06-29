export interface DataSource {
    id?: number;
    dataSourceName: string;
    dataSourceType: string;
    driverClassName: string;
    userName?: string,
    password?: string,
    url: string;
    createdAt: Array<number>;
    updatedAt: Array<number>;
}