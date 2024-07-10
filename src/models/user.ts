import { pseudoRandomBytes } from "crypto";
import config from "../config";
import { IUser } from "../interface/user";
import { Client } from "pg";
import { query } from "express";

//Setting up client
const client = new Client({
  user: config.database.POSTGRES_USER,
  host: 'localhost',
  database: config.database.POSTGRES_DB,
  password: config.database.POSTGRES_PW,
  port:5432,
})

//connecting to psql server
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to psql server");
});

//function to run sql query
async function runQuery(PSQLquery:string,values:string[]) {
  try{
    const output=await client.query(PSQLquery,values);
    console.log(output.rows)
  }
  catch(err){
    console.log(err);
  }
}

//Array for storing users
const users: IUser[] = [];

//Function to add user
export function createUser(user: IUser) {
  const req_user = {
    ...user,
    id: `${users.length + 1}`,
  };
  users.push(req_user);
  const queryText = `
  INSERT INTO todo.user(user_name, user_email, user_password)
  VALUES ($1, $2, $3)
  RETURNING *;`;

const values = [req_user.name, req_user.email, req_user.password];
console.log('Values: ',values);

runQuery(queryText, values);
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

