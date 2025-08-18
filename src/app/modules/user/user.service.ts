import AppError from "../../errorhelpers/AppErro";
import { IAuthprovider, IUser, Role } from "./user.interfaces";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }
  const hashedpassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authprovider: IAuthprovider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    ...rest,
    password: hashedpassword,
    auths: [authprovider],
  });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserexist = await await User.findById(userId);
  if (!ifUserexist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Exist");
  }
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
      if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
        throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
      }
    }
    if (payload.password) {
      payload.password = await bcryptjs.hash(
        payload.password,
        envVars.BCRYPT_SALT_ROUND
      );
    }
  }
  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdateUser;
};

const getAlluser = async () => {
  const users = await User.find({});
  const totalusers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalusers,
    },
  };
};

export const UserServics = {
  createUser,
  getAlluser,
  updateUser,
};
