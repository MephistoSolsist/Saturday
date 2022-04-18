import { member, member_role_relation, PrismaClient, role } from "@prisma/client"
import { type } from "os"
import { exclude } from "../util/dbUtils"
type memberWithRole = member & {
  member_role_relation: (member_role_relation & {
    role: role
  })[]
}
// type publicMember = Omit<member, "member_role_relation" | "password"> & {
//   role: string
// }
// type publicMember = Pick<member, Exclude<keyof member, "member_role_relation" | "password">> & {
//   role: string
// }
type publicMember = {
  member_id: string
  alias: string | null
  name: string | null
  section: string | null
  profile: string | null
  phone: string | null
  qq: string | null
  avatar: string | null
  created_by: string | null
  gmt_create: Date
  gmt_modified: Date
}
export default class MemberClient {
  prisma: PrismaClient["member"]
  constructor(prisma: PrismaClient["member"]) {
    this.prisma = prisma
  }

  includeRole = {
    member_role_relation: {
      include: {
        role: true,
      },
    },
  }
  flatten = (member: memberWithRole) => {
    const memberRole = member.member_role_relation[0].role.role
    return {
      ...exclude(member, "member_role_relation"),
      role: memberRole,
    }
  }

  setPrivate = (member: member) => {
    return {
      ...exclude(member, "password"),
    }
  }

  getMemberById = async (member_id: string) => {
    const member = await this.prisma.findUnique({
      where: { member_id },
      include: this.includeRole,
    })
    if (!member) {
      return member
    }
    return this.flatten(member)
  }

  getPublicMemberById = async (member_id: string): Promise<publicMember | null> => {
    const member = await this.getMemberById(member_id)
    return member ? this.setPrivate(member) : member
  }

  getPublicMembers = async (offset: number, limit: number) => {
    const members = await this.prisma.findMany({
      include: this.includeRole,
      skip: offset,
      take: limit,
    })
    const res: publicMember[] = []
    members.forEach(member => {
      const temp = this.flatten(member)
      res.push(this.setPrivate(temp))
    })
    return res
  }
  toExport() {
    return {
      getMemberById: this.getMemberById,
      getPublicMemberById: this.getPublicMemberById,
      getPublicMembers: this.getPublicMembers,
    }
  }
  get() {
    return Object.assign(this.prisma, this.toExport())
  }
}

// export default function Members(prisma: PrismaClient["member"]) {
//   type memberWithRole = member & {
//     member_role_relation: (member_role_relation & {
//       role: role
//     })[]
//   }
//   const includeRole = {
//     member_role_relation: {
//       include: {
//         role: true,
//       },
//     },
//   }
//   const flatten = (member: memberWithRole) => {
//     Object.assign(member, {
//       role: member.member_role_relation[0].role.role,
//     })
//     exclude(member, "member_role_relation")
//     return member
//   }

//   const setPrivate = (member: member) => {
//     exclude(member, "password")
//     return member
//   }

//   const getMemberById = async (member_id: string) => {
//     const member = await prisma.findUnique({
//       where: { member_id },
//       include: includeRole,
//     })
//     // member not found
//     if (!member) {
//       return member
//     }
//     flatten(member)
//     return member
//   }

//   const getPublicMemberById = async (member_id: string) => {
//     const member = await getMemberById(member_id).then()
//     return member ? setPrivate(member) : member
//   }

//   const getPublicMembers = async (offset: number, limit: number) => {
//     const members = await prisma.findMany({
//       include: includeRole,
//       skip: offset,
//       take: limit,
//     })
//     members.forEach(member => {
//       flatten(member)
//       setPrivate(member)
//     })
//     return members
//   }

//   return Object.assign(prisma, {
//     getMemberById,
//     getPublicMemberById,
//     getPublicMembers,
//   })
// }
