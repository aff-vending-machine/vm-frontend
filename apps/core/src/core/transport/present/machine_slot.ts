import { MachineSlotRepository } from '~/core/data';
import { MachineSlotUsecase } from '~/core/domain';
import { MachineSlotBloc } from '..';

const MachineSlotDomain = (() => {
  let domain: MachineSlotUsecase;
  return {
    getInstance: () => {
      if (domain == null) {
        domain = new MachineSlotUsecase(new MachineSlotRepository());
      }
      return domain;
    },
  };
})();

export const provideMachineSlotBloc = (): MachineSlotBloc => new MachineSlotBloc(MachineSlotDomain.getInstance());
