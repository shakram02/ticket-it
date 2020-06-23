import { PassportStatic } from "passport";

import bcrypt from "bcryptjs";
import { User, IUser, verifyPassword } from "../models/User";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;



export default class PassportLocalStrategy {
    constructor(passport: PassportStatic) {
        this.setupSerializeUser(passport);
        this.setupDeserializeUser(passport);
        this.setupStrategy(passport);
    }

    private setupSerializeUser(passport: PassportStatic) {
        passport.serializeUser((user: IUser, done) => done(null, user.id));
    }

    private setupDeserializeUser(passport: PassportStatic) {
        passport.deserializeUser((id, done) =>
            User.findById(id, (err, user) => done(err, user))
        );
    }

    private setupStrategy(passport: PassportStatic) {
        let strategyConfig = {
            usernameField: "email",
            passwordField: "password"
        };

        let verifyFunction = (email: string, password: string, done: Function) => {
            User.findOne({ email: email }, function (err, user) {
                
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!verifyPassword(user, password)) { return done(null, false); }
                console.log("AUTHENTICATION OK!", user);
                return done(null, user);
            });
        }
        passport.use(new LocalStrategy(strategyConfig, verifyFunction));
    }

    private async validateUser(email: string, password: string, done: any) {
        throw "Not implemented.";
    }

}
