import express, { Application } from "express";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./routes";

const app: Application = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    errorMessages: [
      {
        path: "",
        message: "API not found",
      },
    ],
  });
});

export default app;
