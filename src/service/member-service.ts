import { member, PrismaClient } from "@prisma/client"
import { HttpStatusCode, ServiceError } from "../util/error"
import Members from "../client/member-client"

class MemberService {
  private readonly prisma = new PrismaClient()
  private readonly members = new Members(this.prisma.member).g

  async getMember(member_id: string) {
    return await this.members.getMemberById(member_id)
  }

  async getPublicMember(member_id: string) {
    return await this.members.getPublicMemberById(member_id)
  }

  async getPublicMembers(offset: number, limit: number) {
    return await this.members.getPublicMembers(offset, limit)
  }

  async createMember(member: member) {
    const oldMember = await this.getMember(member.member_id)
    if (oldMember) throw new ServiceError("Member already exists").setHttpStatusCode(HttpStatusCode.Conflict)
    const newMember = await this.members.create({ data: member })
    return newMember
  }
}
export default new MemberService()
