import express from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verify-token";
import { deleteUser, getAllUsers, getUser, getUsersStats, updateUser } from "../controllers/user-controller";

const userRouter = express.Router();
userRouter.put("/update-user/:id", verifyTokenAndAuthorization, updateUser);
userRouter.delete("/delete-user/:id",verifyTokenAndAuthorization, deleteUser);
userRouter.get("/get-user/:id",verifyTokenAndAdmin ,getUser);
userRouter.get("/get-all-users",verifyTokenAndAdmin,getAllUsers);
userRouter.get("/get-users-stats", verifyTokenAndAdmin,getUsersStats);
export default userRouter;      
