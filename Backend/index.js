import  express  from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";
import jobsRoute from "./routes/jobs.js";
import usersRoute from "./routes/users.js";
import activityRoute from "./routes/activity.js";
import recommendedRoute from "./routes/recommended.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cookieSession from 'cookie-session';
import { db } from "./db.js";

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
async function connect(){
    try{
        await mongoose.connect(db)
        console.log("Connected to MongoDB!!")
    }catch(error){
        console.log(error);
    }
}

connect();

app.use(cors({
    origin: '*',
    credentials: true
  }));

  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }));

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoute)

app.use("/api/jobs", jobsRoute)

app.use("/api/users", usersRoute)

app.use("/api/recommended", recommendedRoute)

app.use("/api/activity", activityRoute)

app.listen(8000,()=>{
    console.log("Connected")
})