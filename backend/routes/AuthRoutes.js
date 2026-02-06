import express from "express";

import { register, verifyOtp , login  , Institution_register } from "../controllers/AuthController.js";
import { Institution_login  , organization_login , organization_register} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);


router.post("/institution-register" , Institution_register);
router.post("/institution-login", Institution_login);


router.post("/organization-register" , organization_register);
router.post("/organization-login", organization_login);


export default router;
