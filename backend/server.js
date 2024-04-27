import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import path from "path";

const port = process.env.PORT || 8000;

import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
