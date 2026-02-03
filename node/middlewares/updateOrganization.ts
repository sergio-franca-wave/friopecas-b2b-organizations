import parser from 'co-body';

export async function updateOrganization(
    ctx: Context,
    next: () => Promise<unknown>
) {
    try {
        const { id, name } = await parser(ctx.req);

        const response = await ctx.clients.organizations.update(id, name);

        ctx.status = 200;
        ctx.body = response;

    // @ts-ignore .
    } catch (error: any) {
        ctx.status = error.response?.status || 500;
        ctx.body = {
            error: error.message,
            details: error.response?.data || error
        };
    }

    await next();
}