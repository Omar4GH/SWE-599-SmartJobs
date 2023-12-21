import { db } from "../db.js";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const authRouter = express.Router();
const dbName = "cluster0";

export const getUsers = async (req, res) => {
  try {
    const client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);

    const users = await dbname
      .collection("users")
      .find(
        {},
        {
          // Empty filter to get all users
          projection: {
            _id: 1,
            type: 1,
            email: 1,
            username: 1,
            firstname: 1,
            lastname: 1,
            bio: 1,
            birthdate: 1,
            company: 1,
            title: 1,
            mailing: 1,
            experience: 1,
            education: 1,
            country: 1,
            subscribed: 1,
            saved_posts: 1,
            profileImage: 1,
          },
        }
      )
      .toArray();

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json("Users not found");
    }

    client.close();
  } catch (err) {
    console.error("Error while fetching users:", err);
    res.status(500).json("Error while fetching users");
  }
};

export const updateUser = async (req, res) => {
  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const userId = req.params.id;

    const filter = { _id: new ObjectId(userId) };

    const update = {
      $set: {
        bio: req.body.bio,
        birthdate: req.body.birthdate,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        company: req.body.company,
        title: req.body.title,
        country: req.body.country,
        experience: req.body.experience,
        education: req.body.education,
        profileImage: req.body.profileImage,
      },
    };

    const result = await dbname.collection("users").updateOne(filter, update);

    if (result.modifiedCount === 1) {
      console.log("User has been updated.");
      res.status(200).json("User has been updated.");
    } else {
      res.status(404).json("User not found or no updates were made.");
    }

    client.close();
  } catch (err) {
    console.error("Error during user update:", err);
    res.status(500).json("Error during user update");
  }
};

export const updateUserMailing = async (req, res) => {
  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const userId = req.params.id;

    const filter = { _id: new ObjectId(userId) };

    const update = {
      $set: {
        mailing: req.body.mailing,
      },
    };

    const result = await dbname.collection("users").updateOne(filter, update);

    if (result.modifiedCount === 1) {
      console.log("User has been updated.");
      res.status(200).json("User has been updated.");
    } else {
      res.status(404).json("User not found or no updates were made.");
    }

    client.close();
  } catch (err) {
    console.error("Error during user update:", err);
    res.status(500).json("Error during user update");
  }
};

export const getUser = async (req, res) => {
  try {
    const client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);

    const id = req.params.id;

    if (!id) {
      res.status(400).json("Missing id parameter");
      return;
    }

    const filter = { _id: new ObjectId(id) };

    const user = await dbname.collection("users").findOne(filter, {
      projection: {
        _id: 1,
        type: 1,
        email: 1,
        username: 1,
        firstname: 1,
        lastname: 1,
        bio: 1,
        birthdate: 1,
        company: 1,
        title: 1,
        experience: 1,
        education: 1,
        mailing: 1,
        country: 1,
        subscribed: 1,
        saved_posts: 1,
        profileImage: 1,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found");
    }

    client.close();
  } catch (err) {
    console.error("Error while fetching user:", err);
    res.status(500).json("Error while fetching user");
  }
};

export const updateUserSavedJobs = async (req, res) => {
  const userId = req.params.id; // The user's ID
  const jobToSave = req.body.jobId; // The job ID to add to saved_jobs

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    // Update the user's saved_jobs array by pushing the job ID
    const result = await dbname
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $push: { saved_posts: jobToSave } }
      );

    if (result.modifiedCount === 1) {
      res.status(200).json("Job saved successfully");
    } else {
      res.status(404).json("User not found"); // User with the given ID not found
    }

    client.close();
  } catch (err) {
    console.error("Error while updating user saved_jobs:", err);
    res.status(500).json("Error while updating user saved_jobs");
  }
};

export const removeUserSavedJob = async (req, res) => {
  const userId = req.params.id; // The user's ID
  const jobToRemove = req.body.jobId; // The job ID to remove from saved_jobs

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    // Update the user's saved_jobs array by pulling the job ID
    const result = await dbname
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { saved_posts: jobToRemove } }
      );

    if (result.modifiedCount === 1) {
      res.status(200).json("Job removed from saved jobs successfully");
    } else {
      res.status(404).json("User not found"); // User with the given ID not found
    }

    client.close();
  } catch (err) {
    console.error("Error while removing job from user saved_jobs:", err);
    res.status(500).json("Error while removing job from user saved_jobs");
  }
};

export const updateSubscribed = async (req, res) => {
  const userId = req.params.id; // The user's ID
  const subscribed = req.body.subscribed;

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const result = await dbname
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $push: { subscribed: subscribed } }
      );

    if (result.modifiedCount === 1) {
      res.status(200).json("Subscribed successfully");
    } else {
      res.status(404).json("User not found"); // User with the given ID not found
    }

    client.close();
  } catch (err) {
    console.error("Error while subscribing :", err);
    res.status(500).json("Error while subscribing");
  }
};

export const removeSubscribed = async (req, res) => {
  const userId = req.params.id; // The user's ID
  const subscribed = req.body.subscribed;

  try {
    const client = new MongoClient(db);
    await client.connect();

    const dbname = client.db(dbName);

    const result = await dbname
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { subscribed: subscribed } }
      );

    if (result.modifiedCount === 1) {
      res.status(200).json("unsubscribed successfully");
    } else {
      res.status(404).json("User not found"); // User with the given ID not found
    }

    client.close();
  } catch (err) {
    console.error("Error while unsubscribing :", err);
    res.status(500).json("Error while unsubscribing");
  }
};

export const updateAlert = async (req, res) => {
  const userId = req.params.id; // The user's ID
  const { index, alert } = req.body; // Index of the subscription to update and the new alert value

  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);

    const result = await dbname
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId), [`subscribed.${index}.0`]: { $exists: true } },
        { $set: { [`subscribed.${index}.0.alert`]: alert } }
      );

    if (result.modifiedCount === 1) {
      res.status(200).json("Alert updated successfully");
    } else if (result.matchedCount === 0) {
      res.status(404).json("User or subscription not found");
    } else {
      res.status(400).json("Invalid request");
    }

    client.close();
  } catch (err) {
    console.error("Error while updating alert:", err);
    res.status(500).json("Error while updating alert");
  }
};
