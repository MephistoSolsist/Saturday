import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { PrismaClient } from "@prisma/client"
import router from "./src/router"
import { errorHandler } from "./src/util/error"

const prisma = new PrismaClient()
const app = new Koa()

app.use(errorHandler())

app.use(bodyParser())

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get("X-Response-Time")
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set("X-Response-Time", `${ms}ms`)
})

// response
app.use(router.routes())

export { app, prisma }

const Port = 3001

app.listen(Port)

console.log("listening at:", Port)
