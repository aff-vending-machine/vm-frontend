import RootLayout from '~/ui/layouts/RootLayout.svelte';
import MainLayout from '~/ui/layouts/MainLayout.svelte';

type Route = {
  path: string
  component?: Promise<any>
  layout?: typeof RootLayout | typeof MainLayout
  requiresAuth?: boolean
  redirect?: string
}

const routes: Route[] = [
  { path: '/', component: import('~/ui/pages/home/Home.svelte'), layout: RootLayout },
  { path: '/login', component: import('~/ui/pages/auth/Login.svelte'), layout: RootLayout },
  { path: '/logout', component: import('~/ui/pages/auth/Logout.svelte'), layout: RootLayout },
  { path: '/main/reports', component: import('~/ui/pages/report/summary/Report.svelte'), layout: MainLayout, requiresAuth: true },
  // { path: '/main/reports/:id/stocks', component: TransactionReport, layout: MainLayout, requiresAuth: true },
  { path: '/main/reports/:id/transactions', component: import('~/ui/pages/report/transactions/Report.svelte'), layout: MainLayout, requiresAuth: true },
  { path: '/main/machines', component: import('~/ui/pages/machine/machine/Machine.svelte'), layout: MainLayout, requiresAuth: true },
  { path: '/main/machines/:id/slots', component: import('~/ui/pages/machine/slot/Slot.svelte'), layout: MainLayout, requiresAuth: true },
  { path: '/main/groups', component: import('~/ui/pages/catalog/group/Group.svelte'), layout: MainLayout, requiresAuth: true },
  { path: '/main/products', component: import('~/ui/pages/catalog/product/Product.svelte'), layout: MainLayout, requiresAuth: true },
  { path: '/main/channels', component: import('~/ui/pages/payment/channel/Channel.svelte'), layout: MainLayout, requiresAuth: true },
  { path: '/main/transactions', component: import('~/ui/pages/payment/transaction/Transaction.svelte'), layout: MainLayout, requiresAuth: true },
  // { path: '/main/users', component: Users, layout: MainLayout, requiresAuth: true },
  // { path: '/main/roles', component: Roles, layout: MainLayout, requiresAuth: true },
  { path: '/main', redirect: '/main/reports' },
  // { path: '/admin/reports', redirect: '/main/reports' },
];

export default routes;
