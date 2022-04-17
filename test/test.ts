// import should from "should"
// import request from "supertest"
// import { app } from "../app"
// import ReturnObject from "../src/util/return-object"

// describe("ReturnObject", () => {
//   it("should return a success object", () => {
//     const res = ReturnObject.success()
//     should(res).have.properties("code")
//     should(res.code).be.equal(0)
//     should(res).have.properties("message")
//     should(res.message).be.equal("success")
//   })
// })
// describe("接口测试", () => {
//   let server: any
//   before(() => {
//     server = app.listen(3333)
//   })
//   after(() => {
//     if (server) {
//       server.close()
//     }
//   })
//   it("登入成功测试", async () => {
//     await request(server)
//       .post("/login")
//       .send({
//         id: "123123",
//         password: "123456",
//       })
//       .expect(200)
//       .expect(res => {
//         should(res.body).have.property("data")
//         const data = res.body.data
//         should(data).have.property("token")
//         should(data).have.property("name")
//       })
//   })
// })
