import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import config from "../config";
import { IUser } from "../interface/user";
import { UnaunthicatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";

//middleware function to Aunthenticate
export function aunthenticate(req: Request, res: Response, next: NextFunction) {
  //extracting authorization from request header
  const { authorization } = req.headers;
  //checking if token is provided in authorization
  if (!authorization) {
    next(new UnaunthicatedError("Un-Aunthenticated"));
  }
  /*
    the incoming token must have format of:
      "Bearer <token>"
    to ensure this, 
    refresh token is splitted by (" ")
    then checked if token[0]==="Bearer"
    and splitted token is of length 2
  */
  const token = authorization?.split(" ");
  if (token?.length !== 2 || token[0] !== "Bearer") {
    next(new UnaunthicatedError("Un-Aunthenticated"));
    return;
  }
  try {
    //JWT verify verifies the token and returns decoded token if verified
    console.log(verify(token[1], config.jwt.jwt_secret!));
    const user = verify(token[1], config.jwt.jwt_secret!) as Omit<IUser,"password">;
    req.user=user;
    //to next fuction of route
    next();
  } catch (error) {
    console.log(error);
  }
}

//middleware function to Authorize
export function authorize(permission: string) {
 
  return (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user!;
    if (!user.permissions.includes(permission)) {
      next(new ForbiddenError("Forbidden"));
    }

    next();
  };
}
