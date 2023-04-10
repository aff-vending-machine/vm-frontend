export const ADMIN_MACHINE = '/admin/machines';
export const ADMIN_REPORT = '/admin/reports';
export const ADMIN_USER = '/admin/users';
export const ADMIN_ROLE = '/admin/roles';

export const ADMIN_MACHINE_ID = (id: string) => ADMIN_MACHINE + '/' + id;
export const ADMIN_MACHINE_SLOTS = (id: string) => ADMIN_MACHINE + '/' + id + "/slots";
export const ADMIN_REPORT_ID = (id: string) => ADMIN_REPORT + '/' + id;
export const ADMIN_USER_ID = (id: string) => ADMIN_USER + '/' + id;
export const ADMIN_ROLE_ID = (id: string) => ADMIN_ROLE + '/' + id;
