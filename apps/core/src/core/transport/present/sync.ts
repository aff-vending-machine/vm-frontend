import { SyncRepository } from '~/core/data';
import { SyncUsecase } from '~/core/domain';
import { SyncBloc } from '..';

const SyncDomain = (() => {
  let domain: SyncUsecase;

  const getInstance = () => {
    if (domain == null) domain = new SyncUsecase(new SyncRepository());
    return domain;
  }

  return { getInstance };
})();

export const provideSyncBloc = (): SyncBloc =>
  new SyncBloc(SyncDomain.getInstance());
