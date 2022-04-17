# Saturday
> still relaxing

## how to start
1. install dependencies
   + [nodejs](https://nodejs.org)
2. install node modules
   ```sh
   npm install
   ```
3. create a .env file in the project root that contains your database url
   ```sh
   touch .env
   echo DATABASE_URL="<YOUR_DATABASE_URL>"
   ```
4. let prisma generate schema from given db
   ```sh
    npx prisma db pull
   ```
5. generate prisma client
   ```sh
   npx prisma generate
   ```
6. run the server
   ```SH
    npm run start
   ```

## resources
+ [typescript](https://www.typescriptlang.org)
+ [koa](https://koajs.com/)
+ [koa-router](https://github.com/ZijianHe/koa-router)
+ [prisma](https://www.prisma.io/)
+ [eslint](https://eslint.org/)
+ [mocha](https://mochajs.org/)
+ [should](https://shouldjs.github.io/)
+ [supertest](https://github.com/visionmedia/supertest)