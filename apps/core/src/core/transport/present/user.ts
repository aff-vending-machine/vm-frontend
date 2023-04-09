import { UserRepository } from '~/core/data';
import { UserUsecase } from '~/core/domain';
import { UserBloc } from '..';

const UserDomain = (() => {
  let domain: UserUsecase;

  const getInstance = () => {
    if (domain == null) domain = new UserUsecase(new UserRepository());
    return domain;
  }

  return { getInstance };
})();

export const provideUserBloc = (): UserBloc =>
  new UserBloc(UserDomain.getInstance());
