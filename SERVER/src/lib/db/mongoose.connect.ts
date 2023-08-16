import mongoose from "mongoose";

import { config } from "../../configs/db.config";

const connectDB = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

console.log("connectDB", connectDB);

export class Database {
  private static instance: Database;
  constructor() {
    this.connect();
  }

  connect(_type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectDB, {
        serverSelectionTimeoutMS: 3990,
        maxPoolSize: 50,
      })
      .then((_) => {
        (_) => console.log(" Connection oke");
      })
      .catch((err) => console.error(`Error connecting`, err));
    mongoose.connection.on("connected", () => {
      console.log("Mongodb connected to db successfully");

      //insert sql ... van van
    });

    mongoose.connection.on("error", (err) => {
      console.error("Connection error", err);
    });

    mongoose.connection.on("disconnect", () => {
      console.log("Connection disconnect");
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
