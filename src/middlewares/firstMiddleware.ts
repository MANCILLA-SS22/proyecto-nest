import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

class FirstMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log(`${req.method} at ${req.url} recived!`);
        next();
    }
}

export default FirstMiddleware; //El objetivo de este middleware será mostrar el método y la ruta que se está visitando.