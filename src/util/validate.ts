import { ObjectSchema } from "joi"
import { ServiceErrorDetail, ServiceError, HttpStatusCode } from "./error"
import { Next, ParameterizedContext as Ctx } from "koa"

class Location {
  getLocation: (ctx: Ctx) => unknown
  constructor(getLocation: (ctx: Ctx) => unknown) {
    this.getLocation = getLocation
  }
  static Body() {
    return new Location((ctx: Ctx) => ctx.request.body)
  }
  static Params() {
    return new Location((ctx: Ctx) => ctx.params)
  }
  static Query() {
    return new Location((ctx: Ctx) => ctx.query)
  }
}

const validate = (schema: ObjectSchema, data: unknown, resource: string) => {
  const { error } = schema.validate(data)
  if (error == null) {
    return
  }
  const serviceError = new ServiceError()
  const errorDetails: ServiceErrorDetail[] = []
  error.details.forEach(detail => {
    if (detail.context && detail.context.key && detail.context.label) {
      errorDetails.push({
        resource: resource,
        field: detail.context.label,
        code: detail.type,
      })
    }
  })
  serviceError.addErrors(errorDetails)
  serviceError.setMessage(error.message)
  serviceError.setHttpStatusCode(HttpStatusCode.Unprocessable_Entity)
  throw serviceError
}

const validator = (schema: ObjectSchema, location: Location) => {
  return async (ctx: Ctx, next: Next): Promise<void> => {
    validate(schema, location.getLocation(ctx), ctx.path)
    await next()
  }
}

export { Location, validate, validator }
