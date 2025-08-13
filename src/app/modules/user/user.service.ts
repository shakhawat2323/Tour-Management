import { UserControllers } from "./user.controller";
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
export const UserServics = {
  createUser,
};
