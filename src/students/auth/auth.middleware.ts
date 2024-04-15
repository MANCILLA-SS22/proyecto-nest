import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.originalUrl);

    const {autorization} = req.headers;
    if(!autorization) throw new HttpException("Unautorized", HttpStatus.UNAUTHORIZED);
    if(autorization !== "xyz123") throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    next();
  }
}

export {AuthMiddleware}