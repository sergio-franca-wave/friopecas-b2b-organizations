import parser from 'co-body';

export async function updateOrganization(
    ctx: Context,
    next: () => Promise<unknown>
) {
    try {
        const { id, name } = await parser(ctx.req);

        console.log('Received organization input:', { id, name });

        const response = await ctx.clients.organizations.update(id, name);

        console.log('GraphQL response:', response);

        ctx.status = 200;
        ctx.body = response;

    // @ts-ignore .
    } catch (error: any) {
        console.error('Error updating organization:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        
        ctx.status = error.response?.status || 500;
        ctx.body = {
            error: error.message,
            details: error.response?.data || error
        };
    }

    await next();
}