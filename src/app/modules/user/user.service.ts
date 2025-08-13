import { IUser } from "./user.interfaces";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({
    name,
    email,
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
