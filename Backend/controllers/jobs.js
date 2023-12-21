import { db } from "../db.js";
import jwt from "jsonwebtoken";
import cookieSession from "cookie-session";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
const authRouter = express.Router();

authRouter.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

const dbName = "cluster0";
export const getJobs = async (req, res) => {
  try {
    const client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);

   

      let pipeline = [
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $match: { active: true }, // Filter active jobs
        },
      ];

      if (req.query.title) {
        pipeline.unshift({
          $match: {
            title: { $regex: new RegExp(req.query.title, 'i') },
          },
        });
      }
      if (req.query.location) {
        pipeline.unshift({
          $match: {
            location: { $regex: new RegExp(req.query.location, 'i') },
          },
        });
      }
      if (req.query.tags) {
        pipeline.unshift({
          $match: {
            tags: { $regex: new RegExp(req.query.tags, 'i') },
          },
        });
      }
      if (req.query.contract) {
        pipeline.unshift({
          $match: {
            contract: { $regex: new RegExp(req.query.contract, 'i') },
          },
        });
      }

      const jobs = await dbname.collection("jobs").aggregate(pipeline).toArray();

    // Debugging: Log the jobs to the console
    console.log(jobs);

    res.status(200).json(jobs);

    client.close();
  } catch (err) {
    console.error("Error while fetching jobs:", err);
    res.status(500).json("Error while fetching jobs");
  }
};
/////////////////////////////////////////
export const getSavedJobs = async (req, res) => {
  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const jobPostIds = req.query.ids.split(',');

    // Convert the IDs to ObjectId
    const jobPostObjectIds = jobPostIds.map((id) => new ObjectId(id));

    // Use the $in operator to find job posts matching the provided IDs
    const jobPosts = await dbname
      .collection('jobs')
      .aggregate([
        {
          $match: { _id: { $in: jobPostObjectIds } }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'uid',
            foreignField: '_id',
            as: 'user'
          }
        }
      ])
      .toArray();

    // Debugging: Log the retrieved job posts
    console.log(jobPosts);

    res.status(200).json(jobPosts);

    client.close();
  } catch (err) {
    console.error('Error while fetching job posts by IDs:', err);
    res.status(500).json('Error while fetching job posts by IDs');
  }
};


export const getJob = async (req, res) => {
  try {
    const client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);

    const jobId = req.params.id; // Job ID from the route parameter

    const job = await dbname
      .collection("jobs")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(jobId), // Match the job with the specified ID
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .toArray();

    if (job.length === 0) {
      // If no job with the specified ID is found, return a 404 response
      res.status(404).json("Job not found");
    } else {
      // Debugging: Log the job to the console
      console.log(job[0]);

      res.status(200).json(job[0]); // Return the found job
    }

    client.close();
  } catch (err) {
    console.error("Error while fetching the job:", err);
    res.status(500).json("Error while fetching the job");
  }
};


export const getUserJobs = async (req, res) => {
  try {
    const client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);

    const userId = req.params.uid; // User's ID from the route parameter

    const userJobs = await dbname
      .collection("jobs")
      .aggregate([
        {
          $match: {
            uid: new ObjectId(userId), // Match jobs with the user's ID
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .toArray();

    // Debugging: Log the user's jobs to the console
    console.log(userJobs);

    res.status(200).json(userJobs);

    client.close();
  } catch (err) {
    console.error("Error while fetching user's jobs:", err);
    res.status(500).json("Error while fetching user's jobs");
  }
};
////////////////////////

export const postJob = async (req, res) => {
  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const jobsCollection = dbname.collection("jobs");

    const jobDocument = {
      title: req.body.title,
      description: req.body.description,
      position: req.body.position,
      contract: req.body.contract,
      postdate: req.body.postdate,
      location: req.body.location,
      salary: req.body.salary,
      url: req.body.url,
      deadline: req.body.deadline,
      specificSalary: req.body.specificSalary,
      tags: req.body.tags, // Assuming req.body.tags is an array
      likes: req.body.likes,
      active: req.body.active,
      category:'',
      uid: new ObjectId(req.body.uid),
    };

    // Assign category based on keywords
    const categoryKeywords = {
      Technology: ['programming', 'data', 'science', 'programmer', 'software', 'developer'],
      Education: ['professor', 'education', 'university', 'phd', 'masters', 'teacher'],
      Marketing: ['marketing', 'advertising', 'digital marketing', 'branding', 'social media'],
      Design: ['design', 'graphic design', 'ui/ux', 'creative', 'visual design'],
      Healthcare: ['healthcare', 'doctor', 'nurse', 'medical', 'health'],
      Finance: ['finance', 'accounting', 'banking', 'financial analyst', 'investments'],
      Sales: ['sales', 'business development', 'account executive', 'sales representative'],
      Writing: ['writing', 'content creation', 'copywriting', 'editor', 'journalism'],
      Engineering: ['engineering', 'mechanical engineering', 'civil engineering', 'electrical engineering'],
      CustomerService: ['customer service', 'customer support', 'customer success'],
      Administration: ['administration', 'office management', 'administrative assistant'],
      Science: ['research', 'scientist', 'laboratory', 'scientific research'],
      Arts: ['art', 'creative arts', 'performing arts', 'fine arts', 'visual arts'],
      HumanResources: ['human resources', 'hr', 'personnel management'],
      Hospitality: ['hospitality', 'hotel management', 'restaurant', 'catering'],
      Legal: ['legal', 'lawyer', 'attorney', 'legal assistant', 'paralegal'],
    };

    const assignedCategory = Object.keys(categoryKeywords).find(category =>
      categoryKeywords[category].some(keyword =>
        jobDocument.title.toLowerCase().includes(keyword)
      )
    );

    jobDocument.category = assignedCategory || ''; // Assign the category or keep it empty

    const result = await jobsCollection.insertOne(jobDocument);

    if (result.insertedId) {
      console.log("Job Post has been created.");
      res.json("Job Post has been created.");
    } else {
      res.status(500).json("Error creating job post.");
    }

    client.close();
  } catch (err) {
    console.error("Main Error during job posting:", err);
    res.status(500).json("Main Error during job posting.");
  }
};

export const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    // Convert the job ID to an ObjectID
    const jobObjectId = new ObjectId(jobId);

    // Delete the job by its ID
    const result = await dbname.collection('jobs').deleteOne({ _id: jobObjectId });

    if (result.deletedCount === 1) {
      res.status(204).send(); // Successful deletion, no content to return
    } else {
      res.status(404).json('Job not found'); // Job with the given ID not found
    }

    client.close();
  } catch (err) {
    console.error('Error while deleting job:', err);
    res.status(500).json('Error while deleting job');
  }
};


export const updateJobActive = async (req, res) => {
  const jobId = req.params.id;
  const newActiveStatus = req.body.active;

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const jobObjectId = new ObjectId(jobId);

    const result = await dbname.collection('jobs').updateOne(
      { _id: jobObjectId },
      { $set: { active: newActiveStatus } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json('Job post updated successfully');
    } else {
      res.status(404).json('Job post not found');
    }

    client.close();
  } catch (err) {
    console.error('Error while updating job post:', err);
    res.status(500).json('Error while updating job post');
  }
};

export const updateJobLike = async (req, res) => {
  const jobId = req.params.id; 
  const userId = req.body.userId; 

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const result = await dbname.collection('jobs').updateOne(
      { _id: new ObjectId(jobId) },
      { $push: { likes: userId } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json('Like sent successfully');
    } else {
      res.status(404).json('Job not found'); 
    }

    client.close();
  } catch (err) {
    console.error('Error while Liking:', err);
    res.status(500).json('Error while Liking');
  }
};
export const removeJobLike = async (req, res) => {
  const jobId = req.params.id; 
  const userId = req.body.userId; 

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

   
    const result = await dbname.collection('jobs').updateOne(
      { _id: new ObjectId(jobId) },
      { $pull: { likes: userId } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json('user id removed from Likes successfully');
    } else {
      res.status(404).json('Job not found'); 
    }

    client.close();
  } catch (err) {
    console.error('Error while removing liking:', err);
    res.status(500).json('Error while removing like');
  }
};

export const updateJob = async (req, res) => {

    try {
      const client = new MongoClient(db, { useUnifiedTopology: true });
      await client.connect();
  
      const dbname = client.db(dbName);
  
      const jobId = req.params.id;
  
      const filter = { _id: new ObjectId(jobId) };
  
      const update = {
        $set: {
          title: req.body.title,
          description: req.body.description,
          position: req.body.position,
          contract: req.body.contract,
          location: req.body.location,
          salary: req.body.salary,
          url: req.body.url,
          deadline: req.body.deadline,
          specificSalary: req.body.specificSalary,
          tags: req.body.tags, // Assuming req.body.tags is an array
        },
      };
  
      const result = await dbname.collection("jobs").updateOne(filter, update);
  
      if (result.modifiedCount === 1) {
        console.log("Job has been updated.");
        res.status(200).json("Job has been updated.");
      } else {
        res.status(404).json("Job not found or no updates were made.");
      }
  
      client.close();
    } catch (err) {
      console.error("Error during Job update:", err);
      res.status(500).json("Error during Job update");
    }
  
};
