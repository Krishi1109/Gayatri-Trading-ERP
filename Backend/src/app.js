import Express from "express";
import userRoute from "./routes/users.route";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = Express();

app.use(Express.json());
app.use(cors());
// app.use(Express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/api/user", userRoute);

export default app;
