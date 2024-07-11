//Importing Interface
import { BadRequestError } from "../error/BadRequestError";
import { ITask } from "../interface/task";

//Array for storing tasks
let tasks: ITask[] = [];

//function to check if task exists on tasks array
function checkOnTasks(id: string, user_id: string) {
  return tasks.find(({ id: taskId }) => {
    return taskId === id;
  });
}

//function to add task on array (create)
export function createTask(task: ITask, user_id: string) {
  for (let taskobj of tasks) {
    if (taskobj.name === task.name && taskobj.user_id === user_id) {
      throw (new BadRequestError("Task already exists for the user"));
    }
  }

  //getting new id by increasing latest id by 1
  const newTaskId =
    tasks.length === 0 ? "1" : `${+tasks[tasks.length - 1].id + 1}`;

  //initializing is_finished flag as false
  const initialFinishFlag = false;

  //creating task obj
  const newTask: ITask = {
    ...task,
    id: newTaskId,
    is_finished: initialFinishFlag,
    user_id: user_id,
  };

  //pushing the obj to task to tasks array
  tasks.push(newTask);

  return `Task Created: ${task.name}`;
}

//reading all task function
export function readTasks(user_id: string) {
  return tasks.filter((obj) => {
    return obj.user_id === user_id;
  });
}

//reading remaining task
export function readRemainingTasks(user_id: string) {
  const taskRemaining = tasks.filter((task) => {
    return !task.is_finished;
  });

  return taskRemaining;
}

//reading finished task
export function readFinishedTasks(user_id: string) {
  const taskFinished = tasks.filter((task) => {
    return task.is_finished;
  });

  return taskFinished;
}

//change task constained on tasks array
export function updateTask(id: string, updatedTask: ITask, user_id: string) {
  //calling function to return obj with the id
  const update_obj = checkOnTasks(id, user_id);

  if (update_obj && update_obj.user_id === user_id) {
    //if obj exists on tasks array
    const temp = update_obj.name;
    const newUpdatedTask = {
      ...updatedTask,
      id: id,
      user_id: user_id,
    };

    //replacing the obj with updated obj
    Object.assign(update_obj, newUpdatedTask);

    return ` task updated: from (${temp}) to (${update_obj.name})`;
  } else {
    throw (new BadRequestError(`no task with given id:${id}`)); 
  }
}

//delete task from task array
export function deleteTask(id: string, user_id: string) {
  //calling function to return obj with the id
  const delete_obj = checkOnTasks(id, user_id);
  
  if (delete_obj && delete_obj.user_id === user_id) {
    //if obj exists on tasks array
    tasks = tasks.filter(({ id: taskId }) => {
      return !(taskId === id);
    });

    return ` task deleted: ${delete_obj.name}`;
  } else {
    throw (new BadRequestError(`no task with given id:${id}`)); 
  }
}
