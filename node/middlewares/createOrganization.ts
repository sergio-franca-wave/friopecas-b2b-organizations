import parser from 'co-body';

export async function createOrganization(
    ctx: Context,
    next: () => Promise<unknown>
) {
    try {
        const { input } = await parser(ctx.req);

        console.log('Received organization input:', input);

        const response = await ctx.clients.organizations.create(input);

        console.log('GraphQL response:', response);

        ctx.status = 200;
        ctx.body = response;

    // @ts-ignore .
    } catch (error: any) {
        console.error('Error creating organization:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        
        ctx.status = error.response?.status || 500;
        ctx.body = {
            error: error.message,
            details: error.response?.data || error
        };
    }

    await next();
}