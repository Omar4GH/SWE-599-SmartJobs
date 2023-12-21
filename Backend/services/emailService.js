// emailService.js
import nodemailer from "nodemailer";
import { db } from "../db.js";
import jwt from "jsonwebtoken";
import cookieSession from "cookie-session";
import { MongoClient, ObjectId } from "mongodb";
import { getInternalRecommendedCategories } from "../controllers/recommended.js";

const dbName = "cluster0";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swe599smartjobs@gmail.com",
    pass: "pgci uxsu joqw jsbr",
  },
});

const sendWelcomeEmail = (userEmail) => {
  const mailOptions = {
    from: "swe599smartjobs@gmail.com",
    to: userEmail,
    subject: "Welcome to SmartJobs",
    text: "Thanks for registering to SmartJobs!",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #007bff;
        }

        p {
          margin-bottom: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to SmartJobs!</h1>
        <p>Thanks for registering to SmartJobs. We're excited to have you on board.</p>
        <p>Feel free to explore our platform and discover great opportunities.</p>
        <p>If you have any questions or need assistance, don't hesitate to contact us.</p>
      </div>
    </body>
    </html>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Saved Jobs Email sent: " + info.response);
    }
  });
};
const sendSavedJobsEmail = (userId, username, userEmail, savedJobs, subscribedJobs, recommenndedJobs) => {
  const secretKey = "SJtoken";

  const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
  };

  const mailOptions = {
    from: "swe599smartjobs@gmail.com",
    to: userEmail,
    subject: "Your Saved Jobs on SmartJobs",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          margin-bottom: 15px;
          line-height: 1.5;
        }
    
        .job-list {
          list-style-type: none;
          padding: 0;
        }
    
        .job-item {
          background-color: #f9f9f9;
          border-radius: 5px;
          margin-bottom: 10px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    
        .section-heading {
          font-size: 1.5em;
          color: #333;
          margin-top: 20px;
          border-bottom: 2px solid #007bff;
          padding-bottom: 5px;
        }
    
        .saved-jobs { color: #28a745; }
        .subscribed-jobs { color: #dc3545; }
        .recommended-jobs { color: #ffc107; }
      </style>
    </head>
    <body>
      <div class="container">
      <h1>Hello ${username}</h1>
        <h1>SmartJobs Weekly Digest</h1>
    
        <div class="section-heading saved-jobs">Your Saved Jobs</div>
        <p>Here are the latest job opportunities you've saved:</p>
        <ul class="job-list">
            ${savedJobs
              .map(
                (job) =>
                  `<li class="job-item"><a href="http://localhost:3000/job/${
                    job._id
                  }?token=${generateToken(userId)}">${job.title} - ${
                    job.position
                  }</a></li>`
              )
              .join("")}
        </ul>
    
        <div class="section-heading subscribed-jobs">Subscribed Search Jobs</div>
        <p>Explore the latest jobs based on your subscribed searches:</p>
        <ul class="job-list">
        ${subscribedJobs
          .map(
            (job) =>
              `<li class="job-item"><a href="http://localhost:3000/job/${
                job._id
              }?token=${generateToken(userId)}">${job.title} - ${
                job.position
              }</a></li>`
          )
          .join("")}
        </ul>
    
        <div class="section-heading recommended-jobs">Recommended Jobs</div>
        <p>Discover personalized job recommendations just for you:</p>
        <ul class="job-list">
        ${recommenndedJobs
          .map(
            (job) =>
              `<li class="job-item"><a href="http://localhost:3000/job/${
                job._id
              }?token=${generateToken(userId)}">${job.title} - ${
                job.position
              }</a></li>`
          )
          .join("")}
        </ul>
    
        <p>Explore these opportunities and apply when ready!</p>
      </div>
    </body>
    </html>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Saved Jobs Email sent: " + info.response);
    }
  });
};
console.log("hehehehe");
const scheduleSavedJobsEmail = async () => {
  console.log("Entered");
  try {
    const client = new MongoClient(db, { useUnifiedTopology: true });
    await client.connect();

    const dbname = client.db(dbName);
    console.log("inside ScheduleSaved Jobs Email");

    // Example: Fetch users with "mailing" = true
    const mailingUsers = await dbname
      .collection("users")
      .find({ mailing: true })
      .toArray();

    // Example: Fetch saved jobs for all mailing users
    for (const user of mailingUsers) {
     // console.log(user);
      const savedJobsIds = user.saved_posts; // Convert each ID to string

      const jobPostObjectIds = savedJobsIds.map((id) => new ObjectId(id));

      // Use the $in operator to find job posts matching the provided IDs
      const savedJobs = await dbname
        .collection("jobs")
        .aggregate([
          {
            $match: {
              _id: { $in: jobPostObjectIds },
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

      // Check if the user has the "subscribed" property before mapping
      const subscribedJobs = user.subscribed
      ? await dbname.collection("jobs").aggregate([
          {
            $match: {
              $or: user.subscribed.map((sub) => ({
                title: { $regex: new RegExp(sub[0].title, 'i') },
                tags: { $regex: new RegExp(sub[0].tags, 'i') },
                contract: { $regex: new RegExp(sub[0].contract, 'i') },
                location: { $regex: new RegExp(sub[0].location, 'i') },
                ...(sub[0].alert ? {} : { "sub[0].alert": true }), // Include alert conditionally
              })),
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
        ]).toArray()
      : [];
    
      const jobCollection = dbname.collection('jobs');

      const recommendedCategoriesResponse = await getInternalRecommendedCategories(user._id);
      
      const recommendedCategories = recommendedCategoriesResponse.recommendedCategories;
      
      const recommenndedJobs = await jobCollection.find({ category: { $in: recommendedCategories } }).toArray();
      
      


    if (savedJobs.length > 0 || subscribedJobs.length > 0 || recommenndedJobs.length > 0) {
      console.log("Found saved Jobs for : " + mailingUsers[0].username);
      console.log(
        "Found Subscribed Jobs Jobs for : " +
          
          mailingUsers[0].username
      );
       sendSavedJobsEmail(user._id, user.username, user.email, savedJobs, subscribedJobs, recommenndedJobs);
    }
    }

    client.close();
  } catch (err) {
    console.error("Error while fetching and sending saved jobs:", err);
  }
};

const startDelayInMilliseconds = 1 * 10 * 1000;
/*
// Call the function to schedule the saved jobs email after the specified delay
setTimeout(() => {
  scheduleSavedJobsEmail();
}, startDelayInMilliseconds);
*/

export { sendWelcomeEmail, scheduleSavedJobsEmail };
