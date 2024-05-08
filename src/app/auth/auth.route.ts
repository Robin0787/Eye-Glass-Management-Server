import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { userValidationSchemas } from "./auth.validation";

const router: Router = Router();

router.post(
  "/register",
  validateRequest(userValidationSchemas.registerUserValidationSchema),
  AuthControllers.registerUser
);

router.post(
  "/login",
  validateRequest(userValidationSchemas.loginUserValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
