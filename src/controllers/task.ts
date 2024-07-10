import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
//importing services for task handler
import * as TaskhandlerService from "../services/task";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Task Controller");

//controller function to createtask
export function createTask(req: Request, res: Response, next: NextFunction) {
  const user_id = req.user!.id;
  logger.info(`adding task by user: ${user_id}`);
  try {
    const { body } = req;
    res.status(HttpStatusCode.ACCEPTED).json({
      Message: TaskhandlerService.createTask(body, user_id!),
    });
  } catch (error) {
    next(error);
  }
}

//controller function to readtask
export function readTasks(req: Request, res: Response, next: NextFunction) {
  const user_id = req.user!.id;
  logger.info(`reading task by user: ${user_id}`);
  const data = TaskhandlerService.readTasks(user_id);
  res.status(HttpStatusCode.ACCEPTED).json(data);
}

//controller function to readtask
export function readRemainingTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user_id = req.user!.id;
  const data = TaskhandlerService.readRemainingTasks(user_id);
  res.status(HttpStatusCode.ACCEPTED).json(data);
}

//controller function to readtask
export function readFinishedTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user_id = req.user!.id;
  const data = TaskhandlerService.readFinishedTasks(user_id);
  res.status(HttpStatusCode.ACCEPTED).json(data);
}

//controller function to update task
export function updatedTask(req: Request, res: Response, next: NextFunction) {
  const user_id = req.user!.id;
  logger.info(`adding task by user: ${user_id}`);
  try {
    const id = req.params.id;
    const { body } = req;
    res.status(HttpStatusCode.ACCEPTED).json({
      msg: TaskhandlerService.updatedTask(id, body, user_id),
    });
  } catch (error) {
    next(error);
  }
}

//controller function to delete task
export function deleteTask(req: Request, res: Response, next: NextFunction) {
  const user_id = req.user!.id;
  logger.info(`Removing task by user: ${user_id}`);
  try {
    const id = req.params.id;
    res.status(HttpStatusCode.ACCEPTED).json({
      msg: TaskhandlerService.deleteTask(id, user_id),
    });
  } catch (error) {
    next(error);
  }
}
