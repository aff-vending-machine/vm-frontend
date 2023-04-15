import { ADMIN_MACHINES, ADMIN_PRODUCTS, ADMIN_REPORTS, ADMIN_ROLES, ADMIN_TRNASACTIONS, ADMIN_USERS } from '~/share/links';

export type SidebarItemType = {
  title: string;
  icon: string;
  link: string;
  role: string; // staff | manager | admin | super-admin
};

export const sidebar: SidebarItemType[] = [
  { title: 'Report', icon: 'report', link: ADMIN_REPORTS, role: 'manager' },
  { title: 'Machine', icon: 'machine', link: ADMIN_MACHINES, role: 'staff' },
  { title: 'Product', icon: 'product', link: ADMIN_PRODUCTS, role: 'staff' },
  { title: 'Transaction', icon: 'machine', link: ADMIN_TRNASACTIONS, role: 'staff' },
  { title: 'User', icon: 'user', link: ADMIN_USERS, role: 'manager' },
  { title: 'Role', icon: 'role', link: ADMIN_ROLES, role: 'super-admin' },
];
