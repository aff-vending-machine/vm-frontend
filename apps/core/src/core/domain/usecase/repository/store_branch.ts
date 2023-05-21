import { CreateStoreBranch, StoreBranch, UpdateStoreBranch, parseStoreBranch } from "~/core/models";
import { BaseUsecaseService, StoreBranchAPI } from "../_base";

export class StoreBranchUsecase extends BaseUsecaseService<StoreBranch, CreateStoreBranch, UpdateStoreBranch> {
  constructor(private service: StoreBranchAPI) {
    super(service, parseStoreBranch);
  }
}
