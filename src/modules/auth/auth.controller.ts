import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.services";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthServices.createUser(req.body);
    res.send({
      result,
      status: httpStatus.OK,
      message: "User created successfully",
    });
  } catch (error) {
    res.send(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await AuthServices.loginUser(email, password);
    res.send({
      result,
      status: httpStatus.OK,
      message: "User login successful",
    });
  } catch (error) {
    res.send(error);
  }
};

const getLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    const result = await AuthServices.getLoggedInUser(authHeader as string);

    res.send({
      result,
      status: httpStatus.OK,
      message: "User retrieved successfully",
    });
  } catch (error) {
    res.send(error);
  }
};

export const AuthController = {
  createUser,
  loginUser,
  getLoggedInUser,
};
