import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { join } from "path";
import morgaan from "morgan";
import connectDB from "./config/db";
import exphbs from "express-handlebars";
import router from "./routes/index";

const CONFIG_PATH = "./config/config.env";

class App {
    public setupApp(): Application {
        this.setupConfig();
        this.setupDB();
        const app = this.setupExpress();
        this.setupLogger(app);
        this.setupHandlebars(app);
        this.setupStaticFolder(app);

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
