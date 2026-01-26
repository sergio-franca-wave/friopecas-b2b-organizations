import { AppGraphQLClient } from '@vtex/api';
import type { InstanceOptions, IOContext } from '@vtex/api';
import type { NormalizedOrganizationInput } from '../typings';

export default class Organizations extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.b2b-organizations-graphql@2.x', context, options);
  }

  private readonly getHeaders = () => {
    const adminToken = this.context.authToken;
    const userToken = this.context.storeUserAuthToken ?? null;
    const { sessionToken, account } = this.context;
  
    let allCookies = `VtexIdclientAutCookie=${adminToken}`;
  
    if (userToken) {
      allCookies += `; VtexIdclientAutCookie_${account}=${userToken}`;
    }
  
    return {
      'x-vtex-credential': this.context.authToken,
      VtexIdclientAutCookie: adminToken,
      cookie: allCookies,
      ...(sessionToken && {
        'x-vtex-session': sessionToken,
      }),
    };
  }

  public create = async (input: NormalizedOrganizationInput) => {
    const headers = this.getHeaders();

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
        headers
      }
    );  
  }

  public update = async (id: string, name: string) => {
    const headers = this.getHeaders();

    return this.graphql.mutate(
      {
        mutate: `
          mutation UpdateOrganization(
            $id: ID!
            $name: String!
            $status: String!
          ) {
            updateOrganization(
              id: $id
              name: $name
              status: $status
            ) {
              id
              status
            }
          }
        `,
        variables: {
          id,
          name,
          status: "on-hold",
        },
      }, {
        headers
      }
    );
  }

  public check = async (id: string) => {
    const headers = this.getHeaders();

    return this.graphql.query(
      {
        query: `
          query GetOrganization($id: ID) {
            getOrganizationById(id: $id) {
              id
            }
          }
        `,
        variables: {
          id,
        },
      }, {
        headers
      }
    );
  }
}
