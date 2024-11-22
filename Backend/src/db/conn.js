import mongoose from "mongoose";

const ConnectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Connect Database successfully!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default ConnectDatabase;
