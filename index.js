// // equivalent to import
// const express = require('express') 
// // create new express instance
// const app = express() 
// // create a route that responds 'hello'
// app.get('/hello', (req, res) => {res.send('Hello World!')})
// // listen to http://localhost:4000
// app.listen(4000)

// const express = require('express')
import express from 'express'
import db from './Kambaz/Database/index.js'
import UserRoutes from './Kambaz/Database/Users/routes.js'
import CourseRoutes from "./Kambaz/Database/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Database/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Database/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Database/Enrollments/routes.js";
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors(
  {
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }
));
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json()); // Body parser MUST be before routes and AFTER cors config + session
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);