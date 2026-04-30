import express from 'express';
import path from 'path';
import { text } from 'stream/consumers';
import { Router } from 'express';


interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const {port, routes, public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }


    async start() {

        //*Middleware

        //*Public Folder
        this.app.use(express.static(this.public_path));

        //*Routes
        this.app.use(this.routes);
        

        //*SPA
        this.app.get("/*splat", (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        });


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });

    }
}