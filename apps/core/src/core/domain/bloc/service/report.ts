import { MachineReport, StockReport, TransactionReport } from "~/core/models";
import { BlocService, ReportUsecase } from "../_base";
import { OperationStatus } from "~/utils";

export class SummaryReportBloc extends BlocService<MachineReport> {
  constructor(private usecase: ReportUsecase) {
    super();
  }

  async report(filter?: Record<string, any>): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      const list = await this.usecase.summary(filter);
      this.updateState({ status: 'success', list });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }
}

export class StockReportBloc extends BlocService<StockReport> {
  constructor(private usecase: ReportUsecase) {
    super();
  }

  async report(machine_id: UniqueID, filter?: Record<string, any>): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      const list = await this.usecase.stocks(machine_id, filter);
      this.updateState({ status: 'success', list });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }
}

export class TransactionReportBloc extends BlocService<TransactionReport> {
  constructor(private usecase: ReportUsecase) {
    super();
  }

  async report(machine_id: UniqueID, filter?: Record<string, any>): Promise<OperationStatus> {
    try {
      this.updateState({ status: 'loading' });

      const list = await this.usecase.transactions(machine_id, filter);
      this.updateState({ status: 'success', list });
    } catch (e: unknown) {
      this.handleError(e)
    }

    return this.state.status
  }
}
