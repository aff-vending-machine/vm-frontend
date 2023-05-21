import { AccountRoleAPI, AccountUserAPI, AuthAPI, CatalogGroupAPI, CatalogProductAPI, MachineAPI, MachineSlotAPI, PaymentChannelAPI, PaymentTransactionAPI, ReportAPI, StoreBranchAPI, SyncAPI } from "../domain/api"
import { AccountRoleBloc, AccountUserBloc, AuthBloc, CatalogGroupBloc, CatalogProductBloc, MachineBloc, MachineSlotBloc, PaymentChannelBloc, PaymentTransactionBloc, SummaryReportBloc, StoreBranchBloc, SyncBloc, StockReportBloc, TransactionReportBloc } from "../domain/bloc"
import { AccountRoleUsecase, AccountUserUsecase, AuthUsecase, CatalogGroupUsecase, CatalogProductUsecase, MachineSlotUsecase, MachineUsecase, PaymentChannelUsecase, PaymentTransactionUsecase, ReportUsecase, StoreBranchUsecase, SyncUsecase } from "../domain/usecase"

const Domain = <T extends new (...args: any[]) => any>(UseCase: T, API: new () => any) => ({
    getInstance: (() => { let domain: InstanceType<T>; return () => domain || (domain = new UseCase(new API())); })()
});

const accountRoleDomain = Domain(AccountRoleUsecase, AccountRoleAPI)
const accountUserDomain = Domain(AccountUserUsecase, AccountUserAPI)
const catalogGroupDomain = Domain(CatalogGroupUsecase, CatalogGroupAPI)
const catalogProductDomain = Domain(CatalogProductUsecase, CatalogProductAPI)
const machineDomain = Domain(MachineUsecase, MachineAPI)
const machineSlotDomain = Domain(MachineSlotUsecase, MachineSlotAPI)
const paymentChannelDomain = Domain(PaymentChannelUsecase, PaymentChannelAPI)
const paymentTransactionDomain = Domain(PaymentTransactionUsecase, PaymentTransactionAPI)
const storeBranchDomain = Domain(StoreBranchUsecase, StoreBranchAPI)

const authDomain = Domain(AuthUsecase, AuthAPI)
const syncDomain = Domain(SyncUsecase, SyncAPI)
const reportDomain = Domain(ReportUsecase, ReportAPI)

export const provideAuthBloc = () => new AuthBloc(authDomain.getInstance())
export const provideSyncBloc = () => new SyncBloc(syncDomain.getInstance())
export const provideSummaryReportBloc = () => new SummaryReportBloc(reportDomain.getInstance())
export const provideStockReportBloc = () => new StockReportBloc(reportDomain.getInstance())
export const provideTransactionReportBloc = () => new TransactionReportBloc(reportDomain.getInstance())

export const provideAccountRoleBloc = () => new AccountRoleBloc(accountRoleDomain.getInstance())
export const provideAccountUserBloc = () => new AccountUserBloc(accountUserDomain.getInstance())
export const provideCatalogGroupBloc = () => new CatalogGroupBloc(catalogGroupDomain.getInstance())
export const provideCatalogProductBloc = () => new CatalogProductBloc(catalogProductDomain.getInstance())
export const provideMachineBloc = () => new MachineBloc(machineDomain.getInstance())
export const provideMachineSlotBloc = () => new MachineSlotBloc(machineSlotDomain.getInstance())
export const providePaymentChannelBloc = () => new PaymentChannelBloc(paymentChannelDomain.getInstance())
export const providePaymentTransactionBloc = () => new PaymentTransactionBloc(paymentTransactionDomain.getInstance())
export const provideStoreBranchBloc = () => new StoreBranchBloc(storeBranchDomain.getInstance())
