import { MachineRepository } from '~/core/data';
import { MachineUsecase } from '~/core/domain';
import { MachineBloc } from '..';

const MachineDomain = (() => {
  let domain: MachineUsecase;
  return {
    getInstance: () => {
      if (domain == null) {
        domain = new MachineUsecase(new MachineRepository());
      }
      return domain;
    },
  };
})();

export const provideMachineBloc = (): MachineBloc => new MachineBloc(MachineDomain.getInstance());
