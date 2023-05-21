import { MachineReport, TransactionReport, StockReport, parseMachineReport, parseTransactionReport, parseStockReport } from "~/core/models";
import { ReportAPI, UsecaseService } from "../_base";
import { toQuery } from "~/utils";

export class ReportUsecase extends UsecaseService {
    constructor(private service: ReportAPI) {
        super();
    }

    async summary(filter?: Record<string, any>): Promise<MachineReport[]> {
        try {
            const query = toQuery({ ...filter });
            const list = await this.service.summary(query);
            const result = list.map(parseMachineReport);

            return Promise.resolve(result);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async stocks(machine_id: UniqueID, filter?: Record<string, any>): Promise<StockReport[]> {
        try {
            const query = toQuery({ ...filter });
            const list = await this.service.stocks(machine_id, query);
            const result = list.map(parseStockReport);

            return Promise.resolve(result);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }

    async transactions(machine_id: UniqueID, filter?: Record<string, any>): Promise<TransactionReport[]> {
        try {
            const query = toQuery({ ...filter });
            const list = await this.service.transactions(machine_id, query);
            const result = list.map(parseTransactionReport);

            return Promise.resolve(result);
        } catch (e: unknown) {
            return Promise.reject(e);
        }
    }
}