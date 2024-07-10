import { IUser } from "../interface/user";

//Array for storing users
const users: IUser[] = [
  {
    id:"1",
    name:"admin",
    email:"admin@admin.com",
    password:"$2b$10$8bnVy6XkAPndk9.XZEv2qOHHpiqLKfQJVVMFkkrb0Ef96hj09qjli",
    permissions:['createUser','createTask','updateTask','DeleteTask']
  }
];

//Function to add user
export function createUser(user: IUser) {
  const req_user = {
    ...user,
    id: `${users.length + 1}`,
  };
  users.push(req_user);
  console.log(users)
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

