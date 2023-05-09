export type ColumnsType = {
    key: string;
    header: string;
    sortable?: boolean;
};

export type ColumnSortType = {
    key?: string;
    direction: 'asc' | 'desc';
};
