import app from "./src/app";
import ConnectDatabase from "./src/db/conn";
import error from "./src/middlewares/error";
import dotEnv from "dotenv";

dotEnv.config();

const PORT = process.env.PORT;

ConnectDatabase();

app.use(error);
app.listen(PORT, (req, res) => {
  console.log(`server is running on the port - ${PORT}!`);
});
