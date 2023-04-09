import { RoleRepository } from '~/core/data';
import { RoleUsecase } from '~/core/domain';
import { RoleBloc } from '..';

const RoleDomain = (() => {
  let domain: RoleUsecase;

  const getInstance = () => {
    if (domain == null) domain = new RoleUsecase(new RoleRepository());
    return domain;
  }

  return { getInstance };
})();

export const provideRoleBloc = (): RoleBloc =>
  new RoleBloc(RoleDomain.getInstance());
