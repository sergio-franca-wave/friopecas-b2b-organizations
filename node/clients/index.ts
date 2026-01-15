import { IOClients } from '@vtex/api';

import Organizations from './organizations';

export class Clients extends IOClients {
  public get organizations() {
    return this.getOrSet('organizations', Organizations);
  }
}
