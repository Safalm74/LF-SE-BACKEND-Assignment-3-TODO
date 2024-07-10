import { BadRequestError } from "../error/BadRequestError";
import { IUser } from "../interface/user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("User Model");

//Array for storing users
let users: IUser[] = [
  {
    id: "1",
    name: "admin",
    email: "admin@admin.com",
    password: "$2b$10$8bnVy6XkAPndk9.XZEv2qOHHpiqLKfQJVVMFkkrb0Ef96hj09qjli",
    permissions: [
      "user.post",
      "user.get",
      "user.put",
      "user.delete",
      "task.post",
      "task.put",
      "task.delete",
      "task.get",
    ],
  },
];

//function to check if user exists on users array
function checkOnUser(id: string) {
  return users.find(({ id: userId }) => {
    return userId === id;
  });
}
//Function to add user
export function createUser(user: IUser) {
  const req_user = {
    ...user,
    id: `${users.length + 1}`,
  };
  users.push(req_user);
  logger.info(`User Added: ${req_user.id}`);
  return req_user;
}

//function to read user by id
export function getUserById(id: string) {
  return users.find(({ id: userId }) => {
    return userId === id;
  });
}

//function to read user by email
export function getUserByEmail(email: string) {
  return users.find(({ email: userId }) => {
    return userId === email;
  });
}

//change user contained on users array
export function updateUser(id: string, updatedUser: IUser) {
  //calling function to return obj with the id
  const update_obj = checkOnUser(id);
  if (update_obj) {
    //if obj exists on users array
    const temp = update_obj.name;
    const newUpdatedUser = {
      ...updatedUser,
      id: id,
    };
    //replacing the obj with updated obj
    Object.assign(update_obj, newUpdatedUser);
    return update_obj;
  } else {
    throw (new BadRequestError(`no user with given id:${id}`)); 
  }
}

//delete user from users array
export function deleteUser(id: string) {
  //calling function to return obj with the id
  const delete_obj = checkOnUser(id);
  if (delete_obj ) {
    //if obj exists on users array
    users = users.filter(({ id: userId }) => {
      return !(userId === id);
    });
    return ` user deleted: ${delete_obj.name}`;
  } else {
    throw (new BadRequestError(`no user with given id:${id}`)); 
  }
}
