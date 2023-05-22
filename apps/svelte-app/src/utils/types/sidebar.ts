import { MAIN_MACHINES, MAIN_PRODUCTS, MAIN_PRODUCT_GROUPS, MAIN_REPORTS, MAIN_ROLES, MAIN_PAYMENT_TRNASACTIONS, MAIN_USERS, MAIN_PAYMENT_CHANNELS } from '~/utils/constants/links';

export type SidebarItemType = {
    title: string;
    icon: string;
    link: string;
    role: string; // staff | manager | admin | super-admin
};

export const sidebar: SidebarItemType[] = [
    {
        title: 'Report',
        icon: 'icx-report',
        link: MAIN_REPORTS,
        role: 'staff'
    },
    {
        title: 'Machines',
        icon: 'icx-machine',
        link: MAIN_MACHINES,
        role: 'staff'
    },
    {
        title: 'Product Groups',
        icon: 'ic-group',
        link: MAIN_PRODUCT_GROUPS,
        role: 'manager'
    },
    {
        title: 'Products',
        icon: 'ic-product',
        link: MAIN_PRODUCTS,
        role: 'manager'
    },
    {
        title: 'Channels',
        icon: 'ic-channel',
        link: MAIN_PAYMENT_CHANNELS,
        role: 'super-admin'
    },
    {
        title: 'Transactions',
        icon: 'icx-transaction',
        link: MAIN_PAYMENT_TRNASACTIONS,
        role: 'staff'
    },
    {
        title: 'User',
        icon: 'icx-user',
        link: MAIN_USERS,
        role: 'super-admin'
    },
    {
        title: 'Role',
        icon: 'icx-role',
        link: MAIN_ROLES,
        role: 'super-admin'
    },
];
