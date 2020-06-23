import userService from "../services/userService"
import { Response } from "express";

import { IUserRegistrationData, validateUserInput } from "../models/User";
import { badRequest, ok } from "../lib/responseUtils";

class UserController {
    /**
     * registerUser
     */
    public async registerUser(res: Response, userInfo: IUserRegistrationData) {
        // TODO: validateInput
        let alreadyExists = await userService.checkEmailExists(userInfo);

        if (alreadyExists) {
            badRequest(res, "Email already exists");
        } else {
            let result = await userService.registerUser(userInfo);
            ok(res, result);
        }
    }
}

const controller = new UserController();
export default controller;
