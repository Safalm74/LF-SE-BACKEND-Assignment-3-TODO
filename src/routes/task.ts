// importing module express
import express from "express";
//Importing controllers
import * as TaskController from "../controllers/task";
import { aunthenticate, authorize } from "../middleware/auth";

//creating route
const router = express();

//route to create task: C
router.post(
  "/",
  aunthenticate,
  authorize("createTask"),
  TaskController.createTask
);

//route to read tasks:  R
router.get(
  "/",
  aunthenticate,
  authorize("readTask"),
  TaskController.readTasks
);
//route to read remaining tasks:
router.get(
  "/RemainingTasks",
  aunthenticate,
  authorize("readTask"),
  TaskController.readRemainingTasks
);
//route to read finished tasks:
router.get(
  "/",
  aunthenticate,
  authorize("readTask"),
  TaskController.readFinishedTasks
);

//route to update task: U
router.put(
  "/:id",
  aunthenticate,
  authorize("readTask"),
  TaskController.updatedTask
);

//route to delete task: D
router.delete(
  "/:id",
  aunthenticate,
  authorize("readTask"),
  TaskController.deleteTask
);

//exporting tasks handler router
export default router;
