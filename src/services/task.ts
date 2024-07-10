//interface to receive task
import { ITask } from "../interface/task";
// importing model
import * as TaskHandlerModel from "../models/task";

//service to handle create task
export function createTask(task: ITask, user_id: string) {
  return TaskHandlerModel.createTask(task, user_id);
}

//service to handle read task
export function readTasks(user_id: string) {
  try {
    const readData = TaskHandlerModel.readTasks(user_id);
    return readData;
  } catch (error) {
    throw error;
  }
}
//service to handle read task
export function readRemainingTasks(user_id: string) {
  try {
    const readData = TaskHandlerModel.readRemainingTasks(user_id);
    return readData;
  } catch (error) {
    throw error;
  }
}
//service to handle read task
export function readFinishedTasks(user_id: string) {
  try {
    const readData = TaskHandlerModel.readFinishedTasks(user_id);
    return readData;
  } catch (error) {
    throw error;
  }
}

//service to handle update task
export function updatedTask(id: string, updatedTask: ITask, user_id: string) {
  try {
    return TaskHandlerModel.updateTask(id, updatedTask, user_id);
  } catch (error) {
    throw error;
  }
}

//service to handle delete task
export function deleteTask(taskId: string, user_id: string) {
  try {
    return TaskHandlerModel.deleteTask(taskId, user_id);
  } catch (error) {
    throw error;
  }
}
