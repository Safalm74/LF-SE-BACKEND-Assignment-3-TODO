//importing user model
import * as UserModel from "../models/user";
//importing user interface
import { IUser } from "../interface/user";
//importing bcrypt to hash password
import bcrypt from "bcrypt";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("User Service");

//service function to return user by id
export function getUserById(id: string) {
  logger.info("Attempting to get user by id");
  const data = UserModel.getUserById(id);
  if (!data) {
    logger.error("user not found");
    throw new NotFoundError("user not found");
  }
  return data;
}

//service function to return user by email
export function getUserByEmail(email: string) {
  logger.info("Attempting to get user by email");
  try {
    const data = UserModel.getUserByEmail(email);
    return data;
  } catch (error) {
    throw error;
  }
}

//service function to create new user
export async function createUser(user: IUser) {
  logger.info("Attempting to add user");
  try {
    //checking required data (email and password)
    if (!user.email || !user.password) {
      logger.error(
        `[email: ${user.email ? "Got Email" : "MISSING"}]  [password: ${
          user.password ? "Got password" : "missing"
        }]`
      );
      throw new BadRequestError("Missing: email or password");
    }

    //to prevent multiple user with same email
    logger.info(`comparing with existing emails`);
    if (getUserByEmail(user.email)) {
      logger.error(`Email is already used:${user.email}`);
      throw new BadRequestError("Email is already used");
    }

    //checking if req has name and permissions
    if (!user.name || !user.permissions) {
      logger.warn(
        `[name: ${user.name ? "Got name" : "MISSING"}]  [permissions: ${
          user.permissions ? "Got permission" : "missing"
        }]`
      );
    }

    const password = await bcrypt.hash(user.password, 10); //hashing password

    const newUser = {
      ...user,
      password,
    };

    //creating new user
    return UserModel.createUser(newUser);
  } catch (error) {
    throw error;
  }
}

//service to handle update user
export function updatedUser(id: string, updateUser: IUser) {
  logger.info("Attempting to update user");
  //checking required data (email and password)
  if (!updateUser.email || !updateUser.password) {
    logger.error(
      `[email: ${updateUser.email ? "Got Email" : "MISSING"}]  [password: ${
        updateUser.password ? "Got password" : "missing"
      }]`
    );
    throw new BadRequestError("Missing: email or password");
  }

  //to prevent multiple user with same email
  logger.info(`comparing with existing emails`);
  if ((getUserById(id).email !== updateUser.email) && getUserByEmail(updateUser.email )) { //checking only if email is changed
    logger.error(`Email is already used:${updateUser.email}`);
    throw new BadRequestError("Email is already used");
  }

  return UserModel.updateUser(id, updateUser);
}

//service to handle delete user
export function deleteUser(UserId: string) {
  return UserModel.deleteUser(UserId);
}
