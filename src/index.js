import express from 'express';

import { PORT } from './config.js';
import { sequelize } from './db.js';

import "./models/Book.js"

import bookRoutes from "./routes/books.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express();

try {
    app.use(express.json())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    });
    app.listen(PORT);
    app.use(bookRoutes);
    app.use(authRoutes);

    await sequelize.sync();

    console.log(`Server listening on port ${PORT}`);

} catch (error) {
    console.log(`There was an error on initialization`);
}


