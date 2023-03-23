import express from "express";
import { verifyTokenAndAuthorization } from "./verify-token";

const userRouter = express.Router();

userRouter.put("/:id",verifyTokenAndAuthorization);

export default userRouter;
