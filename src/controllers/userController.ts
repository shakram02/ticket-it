import * as userService from "../services/userService"
import { Request, Response } from "express";
import { check, validationResult, ValidationError, Result } from "express-validator";
import { badRequest, ok } from "../lib/responseUtils";

const MIN_PW_LENGTH = 4;
const MIN_ID_LENGTH = 4;
const MAX_PW_LENGTH = 30;


/**
 * registerUser
 */
export async function postRegisterUser(req: Request, res: Response) {
    let errors = await validateUserInput(req);
    if (errors) {
        res.status(422)
            .json({ errors: errors.array() });
        return;
    }

    let userInfo = req.body;
    let alreadyExists = await userService.checkEmailExists(userInfo);

    if (alreadyExists) {
        badRequest(res, "Email already exists");
    } else {
        let result = await userService.registerUser(userInfo);
        ok(res, result);
    }
}

async function validateUserInput(req: Request): Promise<Result<ValidationError>> {
    await check("name")
        .isLength({ min: MIN_ID_LENGTH })
        .withMessage((val, _) => {
            return `Username needs to be at least ${MIN_ID_LENGTH} characters. [${val}]`;
        })
        .run(req);

    await check("email")
        .isEmail()
        .withMessage((val, _) => {
            return `Invalid email. [${val}]`;
        })
        .run(req);
    await check("password")
        .isString()
        .isLength({ min: MIN_PW_LENGTH })
        .withMessage((val, _) => {
            return `Password needs to be at least ${MIN_PW_LENGTH}. characters [${val}].`;
        })
        .isLength({ max: MAX_PW_LENGTH })
        .withMessage((val, _) => {
            return `Password is too long.`; // Bcrypt length limit
        })
        .run(req);

    return validationResult(req);
}
