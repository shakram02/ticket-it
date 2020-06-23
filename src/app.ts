import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { join } from "path";
import morgaan from "morgan";
import connectDB from "./config/db";
import exphbs from "express-handlebars";
import session from "express-session";
import router from "./routers/indexRouter";
import passport from "passport";
import {setupPassport} from "./config/passport";


const CONFIG_PATH = "./config/config.env";
// const MongoStore = mongo(session);

class App {
    public setupApp(): Application {
        this.setupConfig();
        this.setupDB();
        const app = this.setupExpress();
        this.setupLogger(app);
        this.setupHandlebars(app);
        this.setupStaticFolder(app);
        this.setupBodyParser(app);
        this.setupSession(app);
        this.setupPassport(app);
        return app;
    }

    private setupConfig() {
        // Load config
        dotenv.config({ path: CONFIG_PATH });
    }

    private setupDB() {
        connectDB();
    }

    private setupExpress(): Application {
        return express();
    }

    // Enable logging
    private setupLogger(app: Application) {
        if (process.env.NODE_ENV != "dev") return;
        app.use(morgaan("dev"));
    }

    private setupHandlebars(app: Application) {
        // Handlebars
        app.engine(".hbs", exphbs({ extname: '.hbs', defaultLayout: 'main' }));
        app.set("view engine", ".hbs");
    }

    private setupStaticFolder(app: Application) {
        app.use(express.static(join(__dirname, "..", "public")))
    }

    private setupBodyParser(app: Application) {
        app.use(express.urlencoded({ extended: false }));
    }

    private setupSession(app: Application) {
        let sessionConfig = {
            secret: process.env.SESSION_SECRET as string,
            resave: false,
            saveUninitialized: false
        }
        
        app.use(session(sessionConfig));
    }
    private setupPassport(app: Application) {
        app.use(passport.initialize());
        app.use(passport.session());
        setupPassport(passport);
    }

    public startExpress(app: Application) {
        const PORT = process.env.PORT;
        app.use(router);

        // Start server
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV}`);
        });
    }
}

const application = new App();
const app = application.setupApp();
application.startExpress(app);
