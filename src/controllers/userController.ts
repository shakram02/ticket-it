import { Request, Response } from 'express';
import {
  check, validationResult, ValidationError, Result,
} from 'express-validator';
import * as userService from '../services/userService';
import { badRequest, ok } from '../lib/responseUtils';

const MIN_PW_LENGTH = 4;
const MIN_ID_LENGTH = 4;
const MAX_PW_LENGTH = 30;

async function validateUserInput(req: Request): Promise<Result<ValidationError>> {
  await check('name')
    .isLength({ min: MIN_ID_LENGTH })
    .withMessage((val, _) => `Username needs to be at least ${MIN_ID_LENGTH} characters. [${val}]`)
    .run(req);

  await check('email')
    .isEmail()
    .withMessage((val, _) => `Invalid email. [${val}]`)
    .run(req);
  await check('password')
    .isString()
    .isLength({ min: MIN_PW_LENGTH })
    .withMessage((val, _) => `Password needs to be at least ${MIN_PW_LENGTH}. characters [${val}].`)
    .isLength({ max: MAX_PW_LENGTH })
    // Bcrypt length limit
    .withMessage((val, _) => 'Password is too long.')
    .run(req);

  return validationResult(req);
}

export async function getLogout(req:Request, res:Response) {
  req.logout();
  res.redirect('/');
}

export async function postChangePassword(req:Request, res:Response) {
  throw new Error('Not implemented');
}

/**
 * registerUser
 */
export async function postRegisterUser(req: Request, res: Response) {
  const errors = await validateUserInput(req);
  if (errors) {
    res.status(422)
      .json({ errors: errors.array() });
    return;
  }

  const userInfo = req.body;
  const alreadyExists = await userService.checkEmailExists(userInfo);

  if (alreadyExists) {
    badRequest(res, 'Email already exists');
  } else {
    const result = await userService.registerUser(userInfo);
    ok(res, result);
  }
}
