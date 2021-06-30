import { Server } from './server/server'

/*
    required :
    npm install -g nodemon ts-node
    npm install @types/express @types/cors @types/jsonwebtoken express typescript jsonwebtoken cors body-parser mariadb promise-mysql
*/
new Server().start();