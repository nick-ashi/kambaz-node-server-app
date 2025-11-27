import mongoose from "mongoose"; // load mongoose

const userSchema = new mongoose.Schema({ // create user schema
    _id: String, // pk of type string
    username: { type: String, required: true, unique: true }, // string field thats required and unique
    password: { type: String, required: true }, // string field that in required but not unique
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
  },
  { collection: "users" } // store data in "users" collection

);
export default userSchema;