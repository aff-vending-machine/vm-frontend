import { Bloc } from '~/share';
import { CreateProduct, ProductUsecase, UpdateProduct } from '~/core/domain';
import { ProductInitialState, ProductState } from '..';

export class ProductBloc extends Bloc<ProductState> {
  constructor(private usecase: ProductUsecase) {
    super(ProductInitialState);
  }

  async view(id: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const data = await this.usecase.get(id);
      this.updateState({ kind: 'load-success', data });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async list(filter?: Record<string, any>) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      const count = await this.usecase.count(filter);
      if (count == 0) {
        this.updateState({ kind: 'load-success', list: [], count });
        return;
      }

      const list = await this.usecase.list(filter);
      this.updateState({ kind: 'load-success', list, count });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async create(payload: CreateProduct) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.create(payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async update(id: UniqueID, payload: UpdateProduct) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.update(id, payload);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }

  async delete(id: UniqueID) {
    try {
      this.updateState({ kind: 'load-in-progress' });

      await this.usecase.delete(id);
      this.updateState({ kind: 'load-success' });
    } catch (e: unknown) {
      this.updateState({ kind: 'load-failure', error: e as Error });
    }
  }
}
