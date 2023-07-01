export type SelectOptionsType = {
    label: string;
    value: any;
    filter?: any;
    more?: Record<string, any>;
}

export const enableOptions = [
    { label: 'All', value: null },
    { label: 'Enable', value: true },
    { label: 'Disable', value: false },
];

export const editOptions = [
    { label: 'All', value: null },
    { label: 'Change', value: true },
    { label: "Not change", value: false },
];

export const stockOptions = [
    { label: 'All', value: null },
    { label: 'Available', value: ">:0" },
    { label: 'Out of stocks', value: "<:.01" },
    { label: 'Stock ≤ 20%', value: "<=:.2" },
    { label: 'Full stocks', value: ">:.99" },
  ];
  