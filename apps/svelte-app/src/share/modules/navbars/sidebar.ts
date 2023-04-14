import { ADMIN_MACHINE, ADMIN_REPORT, ADMIN_ROLE, ADMIN_TRNASACTIONS, ADMIN_USER } from '~/share/links';

export type SidebarItemType = {
  title: string;
  icon: string;
  link: string;
  role: string; // staff | manager | admin | super-admin
};

export const sidebar: SidebarItemType[] = [
  { title: 'Report', icon: 'report', link: ADMIN_REPORT, role: 'manager' },
  { title: 'Machine', icon: 'machine', link: ADMIN_MACHINE, role: 'staff' },
  { title: 'Transaction', icon: 'machine', link: ADMIN_TRNASACTIONS, role: 'staff' },
  { title: 'User', icon: 'user', link: ADMIN_USER, role: 'maanger' },
  { title: 'Role', icon: 'role', link: ADMIN_ROLE, role: 'super-admin' },
];
