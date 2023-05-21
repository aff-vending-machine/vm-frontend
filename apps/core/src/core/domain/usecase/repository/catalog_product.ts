import { CreateProduct, CatalogProduct, UpdateProduct, parseCatalogProduct } from "~/core/models";
import { BaseUsecaseService, CatalogProductAPI } from "../_base";

export class CatalogProductUsecase extends BaseUsecaseService<CatalogProduct, CreateProduct, UpdateProduct> {
  constructor(private service: CatalogProductAPI) {
    super(service, parseCatalogProduct);
  }
}
