import express from "express";
import { createUser, getUserById } from "../controllers/user";
import { aunthenticate, authorize } from "../middleware/auth";

const router = express();

//Route to get user by id
router.get("/getUserById/:id", aunthenticate, getUserById);

//Route to add user
router.post("/createUser", aunthenticate, authorize('createUser'), createUser);

export default router;
