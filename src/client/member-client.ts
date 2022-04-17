import { member, member_role_relation, PrismaClient, role } from "@prisma/client"
import { exclude } from "../util/dbUtils"

export default function Members(prisma: PrismaClient["member"]) {
  const includeRole = {
    member_role_relation: {
      include: {
        role: true,
      },
    },
  }
  const setRole = (
    member: member & {
      member_role_relation: (member_role_relation & {
        role: role
      })[]
    }
  ) => {
    Object.assign(member, {
      role: member.member_role_relation[0].role.role,
    })
    exclude(member, "member_role_relation")
    return member
  }

  const setPrivate = (member: member) => {
    exclude(member, "password")
    return member
  }

  const getMemberById = async (member_id: string) => {
    const member = await prisma.findUnique({
      where: { member_id },
      include: includeRole,
    })
    // member not found
    if (!member) {
      return member
    }
    setRole(member)
    return member
  }

  const getPublicMemberById = async (member_id: string) => {
    const member = await getMemberById(member_id).then()
    return member ? setPrivate(member) : member
  }

  const getPublicMembers = async (offset: number, limit: number) => {
    const members = await prisma.findMany({
      include: includeRole,
      skip: offset,
      take: limit,
    })
    members.forEach(member => {
      setRole(member)
      setPrivate(member)
    })
    return members
  }

  return Object.assign(prisma, {
    getMemberById,
    getPublicMemberById,
    getPublicMembers,
  })
}
