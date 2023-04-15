export const ADMIN_REPORTS = '/admin/reports';
export const ADMIN_MACHINES = '/admin/machines';
export const ADMIN_TRNASACTIONS = '/admin/transactions';
export const ADMIN_PRODUCTS = '/admin/products';
export const ADMIN_USERS = '/admin/users';
export const ADMIN_ROLES = '/admin/roles';

export const ADMIN_REPORT_ID = (id: string) => ADMIN_REPORTS + '/' + id;
export const ADMIN_MACHINE_ID = (id: string) => ADMIN_MACHINES + '/' + id;
export const ADMIN_MACHINE_SLOTS = (id: string) => ADMIN_MACHINES + '/' + id + "/slots";
export const ADMIN_PRODUCT_ID = (id: string) => ADMIN_PRODUCTS + '/' + id;
export const ADMIN_USER_ID = (id: string) => ADMIN_USERS + '/' + id;
export const ADMIN_ROLE_ID = (id: string) => ADMIN_ROLES + '/' + id;
