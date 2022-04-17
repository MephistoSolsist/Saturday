import { Next, ParameterizedContext as Ctx } from "koa"
import logger from "./logger"

enum HttpStatusCode {
  OK = 200,
  Created = 201,
  NoContent= 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Unprocessable_Entity = 422,
  Conflict = 409,
  InternalServerError = 500,
}

interface ServiceErrorDetail {
  resource: string
  field: string
  code: string
}

class ServiceError extends Error {
  httpStatusCode: HttpStatusCode = 500
  errors: ServiceErrorDetail[] = []

  setMessage(message: string) {
    this.message = message
    return this
  }
  setHttpStatusCode(httpStatusCode: HttpStatusCode) {
    this.httpStatusCode = httpStatusCode
    return this
  }
  addErrors(error: ServiceErrorDetail[]) {
    this.errors = this.errors.concat(error)
  }

  getErrorResponse() {
    const res = {
      message: this.message,
    }
    if (this.errors.length > 0) {
      Object.assign(res, {
        errors: this.errors,
      })
    }
    return res
  }
}

const errorHandler = () => {
  return async (ctx: Ctx, next: Next) => {
    try {
      await next()
    } catch (error) {
      if (error instanceof ServiceError) {
        ctx.status = error.httpStatusCode
        ctx.body = error.getErrorResponse()
      } else if (error instanceof SyntaxError) {
        if (error.message.indexOf("JSON")) {
          ctx.status = HttpStatusCode.BadRequest
          ctx.body = {
            message: "Body should be a JSON object",
          }
        }
      } else {
        ctx.status = HttpStatusCode.InternalServerError
        logger.error(error)
      }
    }
  }
}

export { HttpStatusCode, ServiceErrorDetail, ServiceError, errorHandler }
