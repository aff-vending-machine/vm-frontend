import { AuthService } from '~/core/data';
import { AuthUsecase } from '~/core/domain';
import { AuthBloc } from '..';

const AuthDomain = (() => {
  let domain: AuthUsecase;

  const getInstance = () => {
    if (domain == null) domain = new AuthUsecase(new AuthService());
    return domain;
  }

  return { getInstance };
})();

export const provideAuthBloc = (): AuthBloc =>
  new AuthBloc(AuthDomain.getInstance());
