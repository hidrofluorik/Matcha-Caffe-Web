import { Router } from "express";
import { validate } from "../middlewares/reqBody.middleware.ts";
import isUserAuthorized from "../middlewares/rbac.middleware.ts";
import { orderSchema } from "../validators/order.validator.ts";
import verifyToken from "../middlewares/acl.middleware.ts";
import { createOrder } from "../controllers/order.controller.ts";

const orderRouter = Router();

orderRouter.post(
  "/",
  [
    verifyToken,
    // Langsung pakai string mentah PascalCase agar sinkron dengan database & token JWT
    // Roles.Pelanggan & Roles.Kasir dimasukkan agar pembeli/kasir bisa checkout pesanan
    isUserAuthorized(["Admin", "Owner", "Barista", "Kasir", "Pelanggan"]),
    validate(orderSchema),
  ],
  createOrder,
);

export default orderRouter;