import { db } from "../db.js";
import express from "express";
import { MongoClient,ObjectId } from "mongodb";

const authRouter = express.Router();

const dbName = "cluster0";

export const getActivity = async (req, res) => {};
//////////////////////////////////////////////////////////////
export const postActivity = async (req, res) => {
    let client;

    try {
      client = new MongoClient(db, { useUnifiedTopology: true });
      await client.connect();
  
      const dbname = client.db(dbName);
      const activityCollection = dbname.collection("activity");
  
      const { userid, jobid, action } = req.body;
  
      // Check if a document with the same userid and jobid already exists
      const existingActivity = await activityCollection.findOne({
        userid: new ObjectId(userid),
        jobid: new ObjectId(jobid),
      });
  
      if (existingActivity) {
        console.log("Existing Activity:", existingActivity);
      
        // If it exists, increment the count
   // If it exists, increment the count
const updatedResult = await activityCollection.updateOne(
    { userid: new ObjectId(userid), jobid: new ObjectId(jobid) },
    { $inc: { count: 1 } }
  );
  
      
  
        if (updatedResult.modifiedCount > 0) {
          console.log("Activity count has been incremented.");
          res.json("Activity count has been incremented.");
        } else {
          res.status(500).json("Error incrementing Activity count.");
        }
      } else {
        // If it doesn't exist, insert a new document
        const activityDocument = {
          action,
          userid: new ObjectId(userid),
          jobid: new ObjectId(jobid),
          count: 1,
        };
  
        const result = await activityCollection.insertOne(activityDocument);
  
        if (result.insertedId) {
          console.log("New activity has been created.");
          res.json("New activity has been created.");
        } else {
          res.status(500).json("Error creating new activity.");
        }
      }
    } catch (err) {
      console.error("Error during Activity:", err);
      res.status(500).json("Error during Activity.");
    } finally {
      if (client) {
        await client.close();
      }
    }
};
