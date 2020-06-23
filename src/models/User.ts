import { Schema, Document, model } from "mongoose";
// Setup mongose user schema
// https://stackoverflow.com/a/34482413/4422856
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";

export interface IUserRegistrationData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export function validateUserInput(userInput: IUserRegistrationData): string[] {
    let errors: string[] = [];
    // TODO: validate user input. express-validator.
    return errors;
}

export function verifyPassword(user: IUser, password: string) {
    return bcrypt.compareSync(password, user.password);
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    insertedAt: Date;
};

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    inserterAt: { type: Date, default: Date.now }
})

export const User = model<IUser>("User", UserSchema);
