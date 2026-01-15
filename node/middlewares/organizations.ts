import parser from 'co-body';

export async function addNewOrganizationWithId(
    ctx: Context,
    next: () => Promise<unknown>
) {
    const { input } = await parser(ctx.req);

    console.log('Received organization input:', input);

    const response = await ctx.clients.organizations.createOrganizationAndCostCentersWithId(input);

    console.log('GraphQL response:', response);

    ctx.status = 200;
    ctx.body = response;

    await next();
}