import { Schema, Document, model, Model } from "mongoose";

// Setup mongose user schema
// https://stackoverflow.com/a/34482413/4422856

export interface IUserRegistrationData {
    name: String;
    email: String;
    password: String;
    passwordConfirmation: String;
}

export function validateUserInput(userInput: IUserRegistrationData): Boolean {

    // TODO: validate user input.
    return true;
}

export interface IUser extends Document {
    name: String;
    email: String;
    password: String;
    insertedAt: Date;
};

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    inserterAt: { type: Date, default: Date.now }
})

export const User = model<IUser>("User", UserSchema);
