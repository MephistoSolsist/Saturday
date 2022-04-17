import Router from "koa-router"
import memberRouter from "./member-router"

const router = new Router()

router.use(memberRouter.routes())

export default router
