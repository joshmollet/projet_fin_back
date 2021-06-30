import * as express from 'express';
import { CareRouter } from './Routers/care_router';
import { ProductRouter } from './Routers/product_router';
import { UserRouter } from './Routers/user_router';
import * as https from 'https';
import * as fs from 'fs';
import * as cors from 'cors';
import { AuthentificationRouter } from './Routers/authentification_router';
import { UserCommonRouter } from './Routers/user_common_router';

export class Server 
{
    private app: express.Application;
    private httpsServer: https.Server;

    constructor()
    {
        /*
            required :
            npm install ts-node @types/express typescript cors jsonwebtoken
        */
        // create the application
        this.app = express();
        this.app.use(cors());

        // Body parser is now replaced by 'express'
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.init_routes();
        
        /*
        GENERATE CERTIFICATE : 
            - openssl.exe genrsa -out certificate/private.pem 2048
            - openssl.exe rsa -in certificate/private.pem -outform PEM -pubout -out certificate/public.pem
            - openssl req -new -key certificate/private.pem -out certificate/certificate.csr
            - openssl x509 -req -days 365 -in certificate/certificate.csr -signkey certificate/private.pem -out certificate/certificate.crt
        */
        let key = fs.readFileSync('certificate/private.pem', 'utf8');
        let certif = fs.readFileSync('certificate/certificate.crt', 'utf8');
        let credentials = { key: key, cert: certif };
        this.httpsServer = https.createServer(credentials, this.app);
    }

    private init_routes()
    {
        this.app.use('/api/token', new AuthentificationRouter().router);
        this.app.use('/api/products', new ProductRouter().router);
        this.app.use('/api/care', new CareRouter().router);
    //     // user common router (create and get by username)
        this.app.use('/api/users-common', new UserCommonRouter().router);
        //this.app.use(AuthentificationRouter.checkAuthorization);    // REQUIRE AUTHENTIFICATION FROM HERE
        this.app.use('/api/users-common', new UserCommonRouter().authRouter);
        this.app.use(AuthentificationRouter.checkAuthorization, AuthentificationRouter.checkIsAdmin);    // REQUIRE ADMIN PRIVILEGES FROM HERE
        // user router (everything else)
        this.app.use('/api/users', new UserRouter().router);
    }

    public start()
    {
        // run with http
        // this.app.listen(8000);

        // run with https
        this.httpsServer.listen(8000);
    }
}