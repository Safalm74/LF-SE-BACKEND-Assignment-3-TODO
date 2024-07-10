import express from "express";
import { createUser, getUserById ,deleteUser,updatedUser} from "../controllers/user";
import { aunthenticate, authorize } from "../middleware/auth";

const router = express();

//Route to add user
router.post("/", aunthenticate, authorize('user.post'), createUser);

//Route to get user by id
router.get("/:id", aunthenticate,authorize('user.get'), getUserById);

//Route to update user by id
router.put("/:id", aunthenticate,authorize('user.put'), updatedUser);

//Route to delete user by id
router.delete("/:id", aunthenticate,authorize('user.delete'), deleteUser);

export default router;
