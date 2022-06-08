"use strict";

const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "./.env" });

//create env file and import it
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// // use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");

// // use this data. Changes will persist until the server (backend) restarts.
// const { flights, reservations } = require("./data");

// import { createRequire } from 'module'

//Get all the post --------------------------------------------------------
const getAllPosts = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final_blog");

    const postInfo = await db.collection("posts").find().toArray();
    const result = [];
    postInfo.forEach((post) => {
      result.push(post);
    });

    if (result) {
      response.status(200).json({
        status: 200,
        data: result,
        message: "posts found",
      });
    } else {
      response.status(404).json({
        starus: 404,
        message: "posts not found",
      });
    }
    client.close();
    // console.log("getAllPosts disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

//Get Single Post-------------------------------------------

const getSinglePost = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const id = request.params.id;

    await client.connect();
    const db = client.db("final_blog");
    const result = await db.collection("posts").findOne({ id });
    console.log("result", result);

    if (result) {
      response.status(200).json({
        status: 200,
        data: result,
        message: "Single post found",
      });
    } else {
      response.status(404).json({
        starus: 404,
        message: "Single post not found",
      });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//Add New Post----------------------------------------------

const addNewPost = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  // console.log("request.body",request.body)

  try {
    await client.connect();
    const db = client.db("final_blog");

    await db.collection("posts").insertOne(request.body);
    response.status(200).json({
      status: 200,
      message: "new post added",
    });

    client.close();
    // console.log("addNewPost disconnected!");
  } catch (err) {
    response.status(400).json({
      status: 400,
      message: "new post cannot be add",
    });
    console.log(err.stack);
  }
};

//updated post--------------------------------------------------------------

const updatePost = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const id = request.params.id;

    //updated the original post
    const query = { id };
    const { title, content } = request.body;
    const newValues = { $set: { title: title, content: content } };
    console.log("newValues", newValues);

    await client.connect();
    const db = client.db("final_blog");

    // //grab the old post
    const oldPost = await db.collection("posts").findOne({ id });
    console.log("oldPost", oldPost);

    //updated the new post
    const updatedPost = await db
      .collection("posts")
      .updateOne(query, newValues);
    console.log("updatedPost", updatedPost);

    if (updatedPost) {
      response.status(200).json({
        status: 200,
        ...request.body,
        message: "post updated",
      });
    } else {
      response.status(400).json({
        status: 400,
        message: "post cannot be update",
      });
    }
    client.close();
    //    console.log("updatePost disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

//add Comment------------------------------------------------------
const addComment = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
    // console.log("request.body", request.body)
    
  try {
    const { _id, time, text, name } = request.body;
    await client.connect();
    const db = client.db("final_blog");

    const comment = {_id, name,time,text};

    await db.collection("comments").insertOne(comment);
    response.status(200).json({
        status: 200,
        message: "new comment added",
      });

    client.close();
      console.log("addComment disconnected!");

  } catch (err) {
      response.status(400).json({
          status: 400,
          message: "fail to add new comment",
        });
      console.log(err.stack);
  }
};

//get comments------------------------------------------------------
//findMany

//Get user----------------------------------------------------------
const getSigninUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  const LoginEmail = request.params.id;
  const { email, name, picture } = request.body;

  try {
    await client.connect();
    const db = client.db("final_blog");

    //findOne (using email) within collection of users
    //If you find one, respond with that found user object
    const result = await db.collection("users").findOne({ email });
    console.log("result", result);

    if (result) {
      response.status(200).json({
        status: 200,
        data: result,
        message: "user found",
      });
    } else {
      const newUser = await db.collection("users").insertOne(request.body);
      console.log("newUser", newUser);
      response.status(200).json({
        status: 200,
        ...request.body,
        message: "user added",
      });
    }

    client.close();
    // console.log("getSigninUser disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  getAllPosts,
  getSinglePost,
  addNewPost,
  getSigninUser,
  updatePost,
  addComment,
};
