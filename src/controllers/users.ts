import { IUserRegistrationData, validateUserInput, IUser, User } from "../models/User";
import { Response } from "express";
import bcrypt from "bcryptjs";
class UserController {
    /**
     * registerUser
     */
    public async registerUser(res: Response, userInfo: IUserRegistrationData) {
        if (!validateUserInput(userInfo)) {
            res.statusCode = 400;
            res.send("Invalid registration data.");
            return;
        }

        let userResult = await User.findOne({ email: userInfo.email })

        if (userResult != null) {
            // Already exists
            res.statusCode = 400;
            res.send("Email already exists.");
            return;
        }

        const { name, email, password } = userInfo;
        let user = new User({
            name, email, password
        });

        // TODO: check password length for bcrypt limits.
        // https://security.stackexchange.com/questions/39849/does-bcrypt-have-a-maximum-password-length
        let salt = bcrypt.genSaltSync();
        let hash = bcrypt.hashSync(password, salt);
        user.password = hash;

        user.save()
            .then(savedUser => res.send(savedUser))
            .catch(error => console.error(error));
    }
}

const controller = new UserController();
export default controller;
