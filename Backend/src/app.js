import Express from "express";
import userRoute from "./routes/users.route";
const app = Express();

app.use(Express.json());

app.use("/api/user", userRoute);

export default app;
