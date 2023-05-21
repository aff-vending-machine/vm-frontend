import { CatalogProduct, CreateProduct, UpdateProduct } from "~/core/models";
import { CatalogProductUsecase, BaseBlocService } from "../_base";

export class CatalogProductBloc extends BaseBlocService<CatalogProduct, CreateProduct, UpdateProduct> {
  constructor(private usecase: CatalogProductUsecase) {
    super(usecase);
  }
}
