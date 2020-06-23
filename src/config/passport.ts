import { PassportStatic } from "passport";
import { User, IUser, verifyPassword } from "../models/User";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;


function setupSerializeUser(passport: PassportStatic) {
    passport.serializeUser((user: IUser, done) => done(null, user.id));
}

function setupDeserializeUser(passport: PassportStatic) {
    passport.deserializeUser((id, done) =>
        User.findById(id, (err, user) => done(err, user))
    );
}

function setupStrategy(passport: PassportStatic) {
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

export function setupPassport(passport: PassportStatic) {
    setupSerializeUser(passport);
    setupDeserializeUser(passport);
    setupStrategy(passport);
}
