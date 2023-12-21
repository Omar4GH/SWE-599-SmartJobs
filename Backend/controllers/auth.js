import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieSession from 'cookie-session';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { sendWelcomeEmail } from '../services/emailService.js';

const authRouter = express.Router();

authRouter.use(cookieSession({
  name: 'session',
  keys: ['SmartJobs', 'key2']
}));
const dbName = 'cluster0';

export async function register(req, res) {
    try {
      const client = new MongoClient(db, { useUnifiedTopology: true });
      await client.connect();
  
      const dbname = client.db(dbName);
  
      // Check if the user already exists based on email or username
      /*
      const existingUser = await dbname.collection('users').findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });*/
      const existingUser = await dbname.collection('users').findOne({
        $or: [{ username: req.body.username }],
      });
      if (existingUser) {
        res.status(409).json('User already exists!');
      } else {
        // Hash the password
        const saltRounds = 10;
        const hash = await bcrypt.hash(req.body.password, saltRounds);
  
        // Create the new user document
        const newUser = {
          type: req.body.type,
          username: req.body.username,
          email: req.body.email,
          password: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          bio: req.body.bio,
          mailing: req.body.country,
          country: req.body.country,
          birthdate: req.body.birthdate,
          company: req.body.company,
          subscribed: req.body.subscribed,
          title: req.body.title,
          experience: req.body.experience,
          education: req.body.education,
          profileImage: req.body.profileImage,
      };
  
        // Insert the user document into the "users" collection
        const result = await dbname.collection('users').insertOne(newUser);
  
        if (result.insertedId) {
          console.log('User created successfully');
          sendWelcomeEmail(req.body.email);
          res.status(200).json('User Created Successfully!');
        } else {
          res.status(500).json('Error during user creation');
        }
      }
  
      client.close();
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json('Error during registration');
    }
  }
//////////////////////////////////////////////////////////////
export const login = async (req, res) => {
    try {
      const client = new MongoClient(db, { useUnifiedTopology: true });
      await client.connect();
  
      const dbname = client.db(dbName);
  
      // Check if the user exists based on the username
      const user = await dbname.collection('users').findOne({ username: req.body.username });
  
      if (!user) {
        res.status(404).json('User not Found!');
        return;
      }
  
      // Check password
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isPasswordCorrect) {
        res.status(400).json('Wrong Login Credentials');
        return;
      }
  
      // Create a JWT token
      const token = jwt.sign({ id: user._id }, 'jwtkey');
  
      // Send the token and user information (excluding password) in the response
      const { password, ...userWithoutPassword } = user;
  
      // Store the token in the session (you can also use cookies if needed)
      req.session.SmartJobs = token;
  
      res.status(200).json(userWithoutPassword);
  
      client.close();
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json('Error during login');
    }
  };


  export const tokenLogin = async (req, res) => {
    console.log("WE IN")
    try {
      const { token } = req.body;
  
      if (!token) {
        return res.status(400).json('Token is missing');
      }
  
      // Verify the token
      const decodedToken = jwt.verify(token, 'SJtoken');
  
      // Fetch user information based on the decoded token
      const client = new MongoClient(db, { useUnifiedTopology: true });
      await client.connect();
  
      const dbname = client.db(dbName);
      const user = await dbname.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      // Send user information (excluding password) in the response
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
  
      client.close();
    } catch (err) {
      console.error('Error during token login:', err);
      res.status(500).json('Error during token login');
    }
  };

export const logout = (req, res) => {

  req.session = null;
  res.status(200).json("User Logged Out!!");

};
