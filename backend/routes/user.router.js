import express from "express";
import { login, logout, register, getProfile, updateProfile, fetchAllUsers, fetchUserById, findRoommate } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/profile",isAuthenticated,getProfile);
router.put("/profile/:id",isAuthenticated,updateProfile);
router.get("/all",fetchAllUsers);
router.get("/:id",fetchUserById);
router.post("/find/roommate",findRoommate);
export default router;
