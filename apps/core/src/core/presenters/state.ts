import { OperationState } from "~/utils";
import { AccountRole, AccountUser, CatalogGroup, CatalogProduct, Machine, MachineReport, MachineSlot, PaymentChannel, PaymentTransaction, StockReport, StoreBranch, TokenData, TransactionReport } from "../models";

export type RoleState = OperationState<AccountRole>
export type UserState = OperationState<AccountUser>
export type GroupState = OperationState<CatalogGroup>
export type ProductState = OperationState<CatalogProduct>
export type MachineState = OperationState<Machine>
export type MachineSlotState = OperationState<MachineSlot>
export type PaymentChannelState = OperationState<PaymentChannel>
export type PaymentTransactionState = OperationState<PaymentTransaction>
export type Branch = OperationState<StoreBranch>

export type AuthState = OperationState<TokenData>
export type SummaryReportState = OperationState<MachineReport>
export type TransactionReportState = OperationState<TransactionReport>
export type StockReportState = OperationState<StockReport>
export type SyncState = OperationState<SyncState>
