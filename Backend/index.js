import app from "./src/app";
import error from "./src/middlewares/error";

app.use(error);
app.listen(5000, (req, res) => {
  console.log("server is running on the port 5000");
});
