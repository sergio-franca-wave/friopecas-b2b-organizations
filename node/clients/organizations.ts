import { AppGraphQLClient } from '@vtex/api';
import type { InstanceOptions, IOContext } from '@vtex/api';
import type { NormalizedOrganizationInput } from '../typings';

export default class Organizations extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.b2b-organizations-graphql@2.x', context, options);
  }

  async createOrganizationAndCostCentersWithId(input: NormalizedOrganizationInput) {
    const adminToken = this.context.authToken
    const userToken = this.context.storeUserAuthToken ?? null
    const { sessionToken, account } = this.context

    let allCookies = `VtexIdclientAutCookie=${adminToken}`

    if (userToken) {
      allCookies += `; VtexIdclientAutCookie_${account}=${userToken}`
    }

    return this.graphql.mutate(
      {
        mutate: `
          mutation CreateOrganizationAndCostCentersWithId(
            $input: NormalizedOrganizationInput!
          ) {
            createOrganizationAndCostCentersWithId(input: $input) {
              id
              status
            }
          }
        `,
        variables: { input },
      }, {
        headers: {
          'x-vtex-credential': this.context.authToken,
          VtexIdclientAutCookie: adminToken,
          cookie: allCookies,
          ...(sessionToken && {
            'x-vtex-session': sessionToken,
          }),
        },
        params: {
          locale: this.context.locale,
        },
      }
    );
  }
}
