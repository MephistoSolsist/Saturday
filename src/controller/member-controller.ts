import MemberService from "../service/member-service"
import { ParameterizedContext as Ctx } from "koa"
import { HttpStatusCode, ServiceError } from "../util/error"

class MemberController {
  async getToken(ctx: Ctx) {
    ctx.body = "TOKEN"
  }
  async createMember(ctx: Ctx) {
    ctx.status = HttpStatusCode.Created
  }

  async getPublicMember(ctx: Ctx) {
    const member = await MemberService.getPublicMember(ctx.params.member_id)
    if (!member) throw new ServiceError("Member not found").setHttpStatusCode(HttpStatusCode.NotFound)
    ctx.body = member
  }

  async getPublicMembers(ctx: Ctx) {
    const members = await MemberService.getPublicMembers(ctx.state.offset, ctx.state.limit)
    ctx.body = members
  }
}

export default new MemberController()
