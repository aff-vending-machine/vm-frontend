import { Machine } from '~/core';
import { BaseAPIService } from '../_base';

const ROOT_PATH = 'machines';

export class MachineAPI extends BaseAPIService<Machine> {
  constructor() {
    super(ROOT_PATH);
  }
}
