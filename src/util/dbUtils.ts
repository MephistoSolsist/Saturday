import { Next, ParameterizedContext as Ctx } from "koa"
const exclude = <T, Key extends keyof T>(target: T, ...keys: Key[]): Omit<T, Key> => {
  for (const key of keys) {
    delete target[key]
  }
  return target
}

const pagingMiddleware = () => {
  return async (ctx: Ctx, next: Next): Promise<void> => {
    const offset = ctx.query.offset && !(ctx.query.offset instanceof Array) ? parseInt(ctx.query.offset) : 0
    const limit = ctx.query.limit && !(ctx.query.limit instanceof Array) ? parseInt(ctx.query.limit) : 30
    ctx.state.offset = offset
    ctx.state.limit = limit
    await next()
  }
}

export { exclude, pagingMiddleware }
