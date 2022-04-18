import { PrismaClient } from "@prisma/client"
import { TypeInfo } from "ts-node"

export default abstract class BaseClient<T> {
  client: PrismaClient<T>
  constructor(client: PrismaClient<T>) {
    this.client = client
  }

  get() {
    return Object.assign(this.client, this.toExport())
  }

  abstract toExport(): unknown
  abstract flatten(): T
}
