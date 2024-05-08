import { Router } from "express";
import { AuthRoutes } from "../auth/auth.route";
import { GlassesRoutes } from "../modules/glasses/glasses.route";
import { SaleProductRoutes } from "../modules/sale/sale.route";

type TModuleRoute = {
  path: string;
  routes: Router;
};

const moduleRoutes: TModuleRoute[] = [
  {
    path: "/glasses",
    routes: GlassesRoutes,
  },
  {
    path: "/auth",
    routes: AuthRoutes,
  },
  {
    path: "/sales",
    routes: SaleProductRoutes,
  },
];

const router: Router = Router();

moduleRoutes.forEach((item) => router.use(item.path, item.routes));

export default router;
