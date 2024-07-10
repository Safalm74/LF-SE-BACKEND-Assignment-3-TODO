import { Request, Response, NextFunction } from "express";
//importing user service
import * as UserService from "../services/user";
import HttpStatusCode from "http-status-codes";

//controller function to get user by id:
export function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; //getting id from request params

    const data = UserService.getUserById(id);
    res.status(HttpStatusCode.ACCEPTED).json(data);
  } catch (error) {
    next(error);
  }
}

//controller function to create user:
export function createUser(req: Request, res: Response, next: NextFunction) {
    try{
          const { body } = req; //getting new user data from request body

  UserService.createUser(body);
  res.status(HttpStatusCode.ACCEPTED).json(body);
    }
    catch(error){
        next(error);
    }

}
