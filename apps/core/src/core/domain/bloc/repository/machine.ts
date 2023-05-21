import { Machine, CreateMachine, UpdateMachine } from "~/core/models";
import { MachineUsecase, BaseBlocService } from "../_base";

export class MachineBloc extends BaseBlocService<Machine, CreateMachine, UpdateMachine> {
  constructor(private usecase: MachineUsecase) {
    super(usecase);
  }
}
