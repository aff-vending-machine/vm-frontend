import { StoreBranch, CreateStoreBranch, UpdateStoreBranch } from "~/core/models";
import { StoreBranchUsecase, BaseBlocService } from "../_base";

export class StoreBranchBloc extends BaseBlocService<StoreBranch, CreateStoreBranch, UpdateStoreBranch> {
  constructor(private usecase: StoreBranchUsecase) {
    super(usecase);
  }
}
