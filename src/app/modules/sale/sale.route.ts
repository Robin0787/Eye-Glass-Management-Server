import { Router } from "express";
import { USER_ROLE } from "../../constant/userRole";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SaleControllers } from "./sale.controller";
import { saleProductValidationSchemas } from "./sale.validation";

const router = Router();

router.post(
  "/sale-product",
  auth(USER_ROLE.user, USER_ROLE.manager),
  validateRequest(saleProductValidationSchemas.saleProductAddValidationSchema),
  SaleControllers.addSaleProduct
);

router.get(
  "/get-sold-products",
  auth(USER_ROLE.user, USER_ROLE.manager),
  SaleControllers.getSoldProducts
);
router.get(
  "/sales-history",
  auth(USER_ROLE.user, USER_ROLE.manager),
  SaleControllers.getSalesHistory
);

export const SaleProductRoutes = router;
