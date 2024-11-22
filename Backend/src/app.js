import Express from "express";
import cors from "cors";

import userRoute from "./routes/users.route";
import purchaseRouter from "./routes/purchase";
import brandRouter from "./routes/brand";
import categoryRouter from "./routes/category";
import variantRouter from "./routes/variant";
import unitRouter from "./routes/unit";

const app = Express();

app.use(Express.json());
app.use(cors());
// app.use(Express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/purchase", purchaseRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/variant", variantRouter);
app.use("/api/unit", unitRouter);

export default app;
