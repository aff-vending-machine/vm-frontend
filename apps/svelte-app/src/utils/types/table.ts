export type ColumnType = {
    key: string;
    title: string;
    type?:  'image' | 'currency' | 'number' | 'date';
    index?: string;
    sortable?: boolean;
    resizable?: boolean;
    render?: (index: number, data: Record<string, any>) => any;
};

export type ColumnSortType = {
    key?: string;
    direction: 'asc' | 'desc';
};
