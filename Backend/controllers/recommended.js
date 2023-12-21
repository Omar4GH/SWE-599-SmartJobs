import { db } from "../db.js";
import express from "express";
import { MongoClient,ObjectId } from "mongodb";

const authRouter = express.Router();

const dbName = "cluster0";

export const getRecommendedCategories = async (req, res) => {

    let client;
  
    try {
      client = new MongoClient(db);
      await client.connect();
  
      const dbname = client.db(dbName);
      const activityCollection = dbname.collection('activity');
      const jobCollection = dbname.collection('jobs');
  
      const userId = req.params.userId;
      
      // Fetch activities where the user visited a job more than 5 times
      const activities = await activityCollection.aggregate([
        {
          $match: { userid: new ObjectId(userId), action: 'visited' , count: { $gt: 5 }}
        },
        {
          $group: {
            _id: '$jobid'
          }
        },
      ]).toArray();
      
      // Extract jobIds from the result
      const jobIds = activities.map(activity => activity._id);
  
      // Fetch job details for the recommended jobs
      const recommendedJobs = await jobCollection.find({ _id: { $in: jobIds } }).toArray();
  
      // Extract unique categories from the recommended jobs
      const recommendedCategories = Array.from(new Set(recommendedJobs.map(job => job.category)));
  
      res.json({ recommendedCategories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  
};


export const getInternalRecommendedCategories = async (userId) => {
  let client;
  
  try {
    client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);
    const activityCollection = dbname.collection('activity');
    const jobCollection = dbname.collection('jobs');

    // Fetch activities where the user visited a job more than 5 times
    const activities = await activityCollection.aggregate([
      {
        $match: { userid: new ObjectId(userId), action: 'visited', count: { $gt: 5 } }
      },
      {
        $group: {
          _id: '$jobid'
        }
      },
    ]).toArray();
    
    // Extract jobIds from the result
    const jobIds = activities.map(activity => activity._id);

    // Fetch job details for the recommended jobs
    const recommendedJobs = await jobCollection.find({ _id: { $in: jobIds } }).toArray();

    // Extract unique categories from the recommended jobs
    const recommendedCategories = Array.from(new Set(recommendedJobs.map(job => job.category)));

    return { recommendedCategories };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (client) {
      await client.close();
    }
  }
};


export const getRecommendedJobs = async (req, res) => {
  let client;
  try {
    client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);
    const userId = req.params.userId;
    const jobCollection = dbname.collection('jobs');
    
    // Call getRecommendedCategories to retrieve recommended categories
    const recommendedCategoriesResponse = await getInternalRecommendedCategories(userId);


    // Extract categories from the response
    const recommendedCategories = recommendedCategoriesResponse.recommendedCategories;
    console.log("Rec  "+recommendedCategories);
    // Fetch jobs from the jobs table based on the recommended categories
    const recommendedJobs = await jobCollection.find({ category: { $in: recommendedCategories } }).toArray(); // Use toArray to convert the cursor to an array


    res.json( recommendedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};
