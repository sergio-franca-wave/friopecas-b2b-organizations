import parser from 'co-body';

export async function createOrganization(
    ctx: Context,
    next: () => Promise<unknown>
) {
    try {
        const { input } = await parser(ctx.req);

        const response = await ctx.clients.organizations.create(input);

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