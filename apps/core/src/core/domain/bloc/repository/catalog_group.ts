import { CatalogGroup, CreateCatalogGroup, UpdateCatalogGroup } from "~/core/models";
import { CatalogGroupUsecase, BaseBlocService } from "../_base";

export class CatalogGroupBloc extends BaseBlocService<CatalogGroup, CreateCatalogGroup, UpdateCatalogGroup> {
  constructor(private usecase: CatalogGroupUsecase) {
    super(usecase);
  }
}
