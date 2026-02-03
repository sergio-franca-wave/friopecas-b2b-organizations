import parser from 'co-body';

export async function checkOrganization(
    ctx: Context,
    next: () => Promise<unknown>
) {
    try {
        const { id } = await parser(ctx.req);

        const response = await ctx.clients.organizations.check(id);

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