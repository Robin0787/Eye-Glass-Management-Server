import { Router } from "express";
import { USER_ROLE } from "../../constant/userRole";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { glassValidationSchemas } from "./glass.validation";
import { GlassControllers } from "./glasses.controller";

const router: Router = Router();

router.post(
  "/add-glass",
  auth(USER_ROLE.user, USER_ROLE.manager),
  validateRequest(glassValidationSchemas.glassAddValidationSchema),
  GlassControllers.addGlass
);
router.get("/", auth(), GlassControllers.getAllGlass);
router.get("/glass/:id", auth(), GlassControllers.getSingleGlass);
router.patch(
  "/:id",
  auth(),
  validateRequest(glassValidationSchemas.glassUpdateValidationSchema),
  GlassControllers.updateSingleGlass
);
router.delete("/delete-glass/:id", auth(), GlassControllers.deleteSingleGlass);

router.delete(
  "/delete-multiple-glass",
  auth(USER_ROLE.user, USER_ROLE.manager),
  validateRequest(glassValidationSchemas.multipleGlassDeleteSchema),
  GlassControllers.deleteMultipleGlass
);

export const GlassesRoutes = router;
