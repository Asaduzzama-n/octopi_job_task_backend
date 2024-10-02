import { NextFunction, Request, Response } from "express";
import { ProductServices } from "./product.services";
import { send } from "process";
import httpStatus from "http-status";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ProductServices.createProduct(req.body);
    res.send({
      result,
      status: httpStatus.OK,
      message: "Product created successfully",
    });
  } catch (error) {
    res.send(error);
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options = req.query;
    const result = await ProductServices.getProducts(options);
    res.send({
      result,
      status: httpStatus.OK,
      message: "Products retrieved successfully",
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await ProductServices.getSingleProduct(id);
    res.send({
      result,
      status: httpStatus.OK,
      message: "Product retrieved successfully",
    });
  } catch (error) {
    res.send(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await ProductServices.deleteProduct(id);
    res.send({
      result,
      status: httpStatus.OK,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send(error);
  }
};
export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
