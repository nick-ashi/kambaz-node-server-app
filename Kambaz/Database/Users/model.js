import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("UserModel", schema); // create the mode from schema
export default model;