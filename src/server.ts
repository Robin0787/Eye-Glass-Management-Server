import mongoose from "mongoose";
import { app } from "./app";
import config from "./app/config";

async function main() {
  mongoose.connect(config.db_uri as string);
  app.listen(config.port, () => {
    console.log("Server is running on port", config.port);
  });
}

main().catch((err) => console.log(err));
