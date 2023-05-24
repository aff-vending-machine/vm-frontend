export const MAIN_REPORTS = '/main/reports';
export const MAIN_MACHINES = '/main/machines';
export const MAIN_PAYMENT_CHANNELS = '/main/channels';
export const MAIN_PAYMENT_TRNASACTIONS = '/main/transactions';
export const MAIN_PRODUCT_GROUPS = '/main/groups';
export const MAIN_PRODUCTS = '/main/products';
export const MAIN_USERS = '/main/users';
export const MAIN_ROLES = '/main/roles';

export const MAIN_REPORT_STOCKS = (id: string) => MAIN_REPORTS + '/' + id + '/stocks';
export const MAIN_REPORT_TRANSACTIONS = (id: string) => MAIN_REPORTS + '/' + id + '/transactions';
// export const MAIN_MACHINE_ID = (id: string) => MAIN_MACHINES + '/' + id;
export const MAIN_MACHINE_SLOTS = (id: string) => MAIN_MACHINES + '/' + id + '/slots';
// export const MAIN_PRODUCT_GROUP_ID = (id: string) => MAIN_PRODUCT_GROUPS + '/' + id;
// export const MAIN_PRODUCT_ID = (id: string) => MAIN_PRODUCTS + '/' + id;
// export const MAIN_USER_ID = (id: string) => MAIN_USERS + '/' + id;
// export const MAIN_ROLE_ID = (id: string) => MAIN_ROLES + '/' + id;
