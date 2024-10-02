import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { ProductValidation } from "./product.helpers";
import { ProductController } from "./product.controller";

const router = express.Router();
router.post(
  "/",
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);
router.get("/:id", ProductController.getSingleProduct);
router.delete("/:id", ProductController.deleteProduct);

router.get("/", ProductController.getProducts);
export const ProductRoutes = router;
