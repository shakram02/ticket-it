import { IUser, User, validateUserInput, IUserRegistrationData, UserSchema } from "../models/User";

import bcrypt from "bcryptjs";


class UserService {
    public async checkEmailExists(userInfo: IUserRegistrationData): Promise<boolean> {
        let userResult = await User.findOne({ email: userInfo.email });
        return userResult != null;
    }

    public async registerUser(userInfo: IUserRegistrationData): Promise<IUser | undefined> {
        const { name, email, password } = userInfo;
        let user = new User({
            name, email, password
        });

        // TODO: check password length for bcrypt limits.
        // https://security.stackexchange.com/questions/39849/does-bcrypt-have-a-maximum-password-length
        let salt = bcrypt.genSaltSync();
        let hash = bcrypt.hashSync(password, salt);
        user.password = hash;

        let saveResult = await user.save();
        return saveResult;
    }
}

export default new UserService();
