import Express from "express";
import cors from "cors";

import userRoute from "./routes/users.route";
import purchaseRouter from "./routes/purchase"
import brandRouter from "./routes/brand"
import packageRouter from "./routes/package"

const app = Express();

app.use(Express.json());
app.use(cors());
// app.use(Express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/purchase", purchaseRouter);
app.use("/api/brand", brandRouter);
app.use("/api/package", packageRouter);

export default app;
