import RootLayout from '~/layouts/RootLayout.svelte';
import MainLayout from '~/layouts/MainLayout.svelte';

import Home from '~/features/home/Home.svelte';
import Login from '~/features/auth/Login.svelte';
import Logout from '~/features/auth/Logout.svelte';
import Report from '~/pages/report/Report.svelte';
import TransactionReport from '~/pages/report/TransactionReport.svelte';
import Machines from '~/pages/machine/Machine.svelte';
import MachineSlots from '~/ui/pages/admin/machine_slots/View.svelte';
import Products from '~/pages/product/Product.svelte';
import ProductGroups from '~/pages/product_group/ProductGroup.svelte';
import Transactions from '~/ui/pages/admin/transactions/View.svelte';
import Users from '~/ui/pages/admin/users/View.svelte';
import Roles from '~/ui/pages/admin/roles/View.svelte';

const routes = [
  { path: '/', component: Home, layout: RootLayout },
  { path: '/login', component: Login, layout: RootLayout },
  { path: '/logout', component: Logout, layout: RootLayout },
  { path: '/main/reports', component: Report, layout: MainLayout, requiresAuth: true },
  { path: '/main/reports/:id/stocks', component: TransactionReport, layout: MainLayout, requiresAuth: true },
  { path: '/main/reports/:id/transactions', component: TransactionReport, layout: MainLayout, requiresAuth: true },
  { path: '/main/machines', component: Machines, layout: MainLayout, requiresAuth: true },
  { path: '/main/machines/:id/slots', component: MachineSlots, layout: MainLayout, requiresAuth: true },
  { path: '/main/groups', component: ProductGroups, layout: MainLayout, requiresAuth: true },
  { path: '/main/products', component: Products, layout: MainLayout, requiresAuth: true },
  { path: '/main/transactions', component: Transactions, layout: MainLayout, requiresAuth: true },
  { path: '/main/users', component: Users, layout: MainLayout, requiresAuth: true },
  { path: '/main/roles', component: Roles, layout: MainLayout, requiresAuth: true },
  { path: '/main', redirect: '/main/reports' },
  { path: '/admin/reports', redirect: '/main/reports' },
];

export default routes;
