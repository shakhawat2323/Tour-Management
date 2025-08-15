import AppError from "../../errorhelpers/AppErro";
import { IAuthprovider, IUser } from "./user.interfaces";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }
  const hashedpassword = await bcryptjs.hash(password as string, 10);

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
};
