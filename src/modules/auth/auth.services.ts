import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import { passwordHelpers } from "../../helpers/password";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwt";

const createUser = async (data: User) => {
  const { email } = data;
  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (isUserExist) {
    return "User already exists";
  }

  const hashedPassword = await passwordHelpers.hashPassword(data?.password);

  const userData = {
    ...data,
    password: hashedPassword,
  };

  const createdUser = await prisma.user.create({
    data: userData,
  });

  if (!createdUser) {
    return "Failed to create user";
  }

  return createdUser;
};

const loginUser = async (email: string, password: string) => {
  const isUserExist = await prisma.user.findUnique({ where: { email } });

  if (!isUserExist) {
    return "User does not exist";
  }

  const isPasswordMatched = await passwordHelpers.isPasswordMatched(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    return "Password is incorrect";
  }

  const accessToken = jwtHelpers.createToken(
    {
      email: email,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const userData = await prisma.user.findUnique({ where: { email } });

  return {
    userData,
    accessToken,
  };
};

const getLoggedInUser = async (bearerToken: string) => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      bearerToken,
      config.jwt.secret as Secret
    );
  } catch (error) {
    return "Invalid accessToken Token";
  }

  const { email } = verifiedToken;

  const userData = await prisma.user.findUnique({
    where: { email },
    select: {
      password: false,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
      phone: true,
    },
  });

  return {
    userData,
  };
};

export const AuthServices = {
  createUser,
  loginUser,
  getLoggedInUser,
};
