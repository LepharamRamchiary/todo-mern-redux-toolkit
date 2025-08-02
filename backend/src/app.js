import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));
app.use(cookieParser());

// import routes
import todoRouter from "./routes/todo.roures.js";

// routes declaraction
app.use("/api/todo", todoRouter);

export { app };
