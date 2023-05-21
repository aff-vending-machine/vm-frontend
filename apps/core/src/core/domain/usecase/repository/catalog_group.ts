import { CreateCatalogGroup, CatalogGroup, UpdateCatalogGroup, parseCatalogGroup } from "~/core/models";
import { BaseUsecaseService, CatalogGroupAPI } from "../_base";

export class CatalogGroupUsecase extends BaseUsecaseService<CatalogGroup, CreateCatalogGroup, UpdateCatalogGroup> {
  constructor(private service: CatalogGroupAPI) {
    super(service, parseCatalogGroup);
  }
}
