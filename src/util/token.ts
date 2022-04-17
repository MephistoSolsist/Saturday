// import jwt from "jsonwebtoken"
const cert = "//TODO"
interface Payload {
  id: string
  role: string
}
const createToken = (day: number, data: Payload) => {
  // const token = jwt.sign(
  //   {
  //     exp: Math.floor(Date.now() / 1000) + day * 24 * 60 * 60,
  //     data: data,
  //   },
  //   cert
  // )
  // return token
  return "createToken"
}

export default createToken
