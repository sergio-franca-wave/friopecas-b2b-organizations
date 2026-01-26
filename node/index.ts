import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
} from '@vtex/api';
import { Clients } from './clients';

import { createOrganization } from './middlewares/createOrganization';
import { updateOrganization } from './middlewares/updateOrganization';
import { checkOrganization } from './middlewares/checkOrganization';

const memoryCache = new LRUCache<string, any>({ max: 5000 });
metrics.trackCache('status', memoryCache);

declare global {
  type Context = ServiceContext<Clients, State>;

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  routes: {
    createOrganization: method({
      POST: [createOrganization],
    }),
    updateOrganization: method({
      PUT: [updateOrganization],
    }),
    checkOrganization: method({
      POST: [checkOrganization],
    }),
  },
});
