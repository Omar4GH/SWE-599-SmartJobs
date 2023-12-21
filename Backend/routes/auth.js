import express from "express";
import { login, logout, register, tokenLogin } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register )
router.post("/login", login )
router.post("/logout", logout )
router.post("/token-login", tokenLogin )
export default router;