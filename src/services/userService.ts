import bcrypt from 'bcryptjs';
import { User, IUserRegistrationData, IUser } from '../models/User';

export async function checkEmailExists(userInfo: IUserRegistrationData): Promise<boolean> {
  const userResult = await User.findOne({ email: userInfo.email });
  return userResult != null;
}

export async function registerUser(userInfo: IUserRegistrationData): Promise<IUser | undefined> {
  const { name, email, password } = userInfo;
  const user: any = new User({
    name, email, password,
  });

  // TODO: check password length for bcrypt limits.
  // https://security.stackexchange.com/questions/39849/does-bcrypt-have-a-maximum-password-length
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  user.password = hash;

  const saveResult = await user.save();
  return saveResult;
}
