import { CreateMachine, Machine, UpdateMachine, parseMachine } from "~/core/models";
import { BaseUsecaseService, MachineAPI } from "../_base";

export class MachineUsecase extends BaseUsecaseService<Machine, CreateMachine, UpdateMachine> {
  constructor(private service: MachineAPI) {
    super(service, parseMachine);
  }
}
