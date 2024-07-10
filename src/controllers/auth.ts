import { Request, Response, NextFunction } from "express";
//Importing auth services
import * as AuthService from "../services/auth";

import HttpStatusCode from "http-status-codes";
import { BadRequestError } from "../error/BadRequestError";

//Controller function to login:
/*
  Responds with access token and refresh token if credentials 
  are correct else error is responded
*/
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req; //extracting body from req for credential
    const data = await AuthService.login(body);
    res.status(HttpStatusCode.ACCEPTED).json(data);
  } catch (error) {
    next(error);
  }
}

//Controller function that uses refesh token to generate new access token:
/*
  Responds with new access token  if valid refresh token id provided else
  error is responded
*/
export async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers; //extracting authorization from request header
    //checking if token is provided in authorization
    if (!authorization) {
      throw (new BadRequestError("No token provided"));
    }
  //generating new access token using the refresh token
  const data = await AuthService.refreshAccessToken(authorization);
  res.status(HttpStatusCode.ACCEPTED).json(data);
  } catch (error) {
    next(error);
  }
}
