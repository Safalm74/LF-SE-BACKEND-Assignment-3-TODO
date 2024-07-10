import { Request, Response, NextFunction } from "express";
//importing user service
import * as UserService from "../services/user";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger=loggerWithNameSpace('User Controller');

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
export async function createUser(req: Request, res: Response, next: NextFunction) {
  logger.info("Request: Add user");
  try {
    const { body } = req; //getting new user data from request body
    const req_user= await UserService.createUser(body);
    res.status(HttpStatusCode.ACCEPTED).json(req_user);
  } catch (error) {
    next(error);
  }
}

//controller function to update user
export function updatedUser(req: Request, res: Response, next: NextFunction) {
  logger.info("Request: Update user");
  try {
    const id = req.params.id;
    const { body } = req;
    res.status(HttpStatusCode.ACCEPTED).json({
      msg: UserService.updatedUser(id, body),
    });
  } catch (error) {
    next(error);
  }
}

//controller function to delete user
export function deleteUser(req: Request, res: Response, next: NextFunction) {
  logger.info("Request: Delete user");
  try {
    const id = req.params.id;
    res.status(HttpStatusCode.ACCEPTED).json({
      msg: UserService.deleteUser(id),
    });
  } catch (error) {
    next(error);
  }
}
