import { MAIN_MACHINES, MAIN_PRODUCTS, MAIN_REPORTS, MAIN_ROLES, MAIN_TRNASACTIONS, MAIN_USERS } from '~/utils/constants/links';

export type SidebarItemType = {
  title: string;
  icon: string;
  link: string;
  role: string; // staff | manager | admin | super-admin
};

export const sidebar: SidebarItemType[] = [
  { title: 'Report', icon: 'report', link: MAIN_REPORTS, role: 'staff' },
  { title: 'Machine', icon: 'machine', link: MAIN_MACHINES, role: 'staff' },
  { title: 'Product', icon: 'product', link: MAIN_PRODUCTS, role: 'manager' },
  { title: 'Transaction', icon: 'transaction', link: MAIN_TRNASACTIONS, role: 'staff' },
  { title: 'User', icon: 'user', link: MAIN_USERS, role: 'super-admin' },
  { title: 'Role', icon: 'role', link: MAIN_ROLES, role: 'super-admin' },
];
