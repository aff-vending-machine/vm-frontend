import { ReportRepository } from '~/core/data';
import { ReportUsecase } from '~/core/domain';
import { ReportBloc } from '..';

const ReportDomain = (() => {
  let domain: ReportUsecase;

  const getInstance = () => {
    if (domain == null) domain = new ReportUsecase(new ReportRepository());
    return domain;
  }

  return { getInstance };
})();

export const provideReportBloc = (): ReportBloc =>
  new ReportBloc(ReportDomain.getInstance());
