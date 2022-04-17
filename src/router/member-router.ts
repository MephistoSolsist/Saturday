import Joi from "joi"
import Router from "koa-router"
import memberController from "../controller/member-controller"
import { MemberSchema } from "../util/schemas"
import { pagingMiddleware } from "../util/dbUtils"
import { Location, validator } from "../util/validate"

const memberRouter = new Router()

const paramIdValidator = validator(
  Joi.object({
    member_id: MemberSchema.member_id.required(),
  }),
  Location.Params()
)

memberRouter.get("/members/:member_id", paramIdValidator, memberController.getPublicMember)

memberRouter.get("/members", pagingMiddleware(), memberController.getPublicMembers)

memberRouter.post(
  "/member/token",
  validator(
    Joi.object({
      member_id: MemberSchema.member_id.required(),
      password: MemberSchema.password.required(),
    }),
    Location.Body()
  ),
  memberController.getToken
)

memberRouter.post(
  "members/:member_id",
  validator(
    Joi.object({
      section: MemberSchema.section.required(),
      name: MemberSchema.name,
      alias: MemberSchema.alias,
      password: MemberSchema.password,
      phone: MemberSchema.phone,
      qq: MemberSchema.qq,
      avatar: MemberSchema.avatar,
    }),
    Location.Body()
  ),
  paramIdValidator,
  memberController.createMember
)

export default memberRouter
