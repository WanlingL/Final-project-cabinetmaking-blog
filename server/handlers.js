"use strict";

const { response } = require("express");
const { request } = require("http");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "./.env" });
const { v4: uuidv4 } = require('uuid');
const {cloudinary} = require("./cloudinary");


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

//updated post-------------------------------------------------

const updatePost = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const id = request.params.id;

    //updated the original post
    const query = { id };
    const { title, content } = request.body;
    const newValues = { $set: { title: title, content: content } };
    // console.log("newValues", newValues);

    await client.connect();
    const db = client.db("final_blog");

    //grab the old post
    const oldPost = await db.collection("posts").findOne({ id });
    console.log("oldPost", oldPost);

    if(!oldPost){
      response.status(404).json({
        status: 404,
        message: "post cannot be found",
      });
      return
    }

    //updated the new post
    const updatedPost = await db.collection("posts").updateOne(query, newValues);
    // console.log("updatedPost", updatedPost);

    if (updatedPost) {
      response.status(200).json({
        status: 200,
        ...request.body,
        message: "post updated",
      });

    } else {
      response.status(404).json({
        status: 404,
        message: "post cannot be update",
      });
    }
    client.close();
    //  console.log("updatePost disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

//add Comment------------------------------------------------------
const addComment = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
    // console.log("request.body", request.body)
    
  try {
    const { post, time, text, name } = request.body;
    await client.connect();
    const db = client.db("final_blog");
    const _id = uuidv4();
    const comment = {_id, post, name,time,text};

    await db.collection("comments").insertOne(comment);

if(comment){
  response.status(200).json({
    status: 200,
    message: "new comment added",
  });
}
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

//get comments on the post--------------------------------------------
const getPostComments = async (request, response) =>{
  const client = new MongoClient(MONGO_URI, options);

  const{post} = request.query

  try{
    await client.connect();
    const db = client.db("final_blog");

    const result = await db.collection("comments").find({post}).toArray();

    response.status(200).json({
      status: 200,
      data: result,
      message: "comments found",
    });

    client.close();
    // console.log("getPostComments disconnected!");
  }
  catch (err) {
    console.log(err.message);
    response.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

// add album--------------------------------------------------
const addNewAlbum = async (request, response) =>{
  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("final_blog");

    await db.collection("albums").insertOne({...request.body, url: []});
    response.status(200).json({
      status: 200,
      message:"new album added"
    });

    client.close();
      console.log("ddNewAlbum disconnected!");
  } catch(err){
      response.status(400).json({
        status: 400,
        message: "new album cannot be add",
      });
      console.log(err.stack);
  }
};

//get All Albums----------------------------------------------

const  getAllAlbums = async (request, response) =>{
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final_blog");

    const albumInfo = await db.collection("albums").find().toArray();
    const result = [];
    albumInfo.forEach((album) => {
      result.push(album);
    });

    if (result) {
      response.status(200).json({
        status: 200,
        data: result,
        message: "albums found",
      });
    } else {
      response.status(404).json({
        starus: 404,
        message: "albums not found",
      });
    }
    client.close();
    // console.log("getAlbums disconnected!");
  } catch (err) {
    console.log(err.stack);
  }
};

//Get Single Album-------------------------------------------

const getSinglealbum = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const id = request.params.id;

    await client.connect();
    const db = client.db("final_blog");
    const result = await db.collection("albums").findOne({ id });
    console.log("result", result);

    if (result) {
      response.status(200).json({
        status: 200,
        data: result,
        message: "Single album found",
      });
    } else {
      response.status(404).json({
        starus: 404,
        message: "Single album not found",
      });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//update album-------------------------------------------------





//add images to cloudinary-------------------------------------
const uploadImage = async( request, response) =>{
  const client = new MongoClient(MONGO_URI, options);

  const {id} = request.body
  try{
    const image = request.body.data;
    const uploadResponse= await cloudinary.uploader.upload(image, {
      folder: "final_project",
    })
    console.log("uploadResponse",uploadResponse);

    await client.connect();
    const db = client.db("final_blog");

    await db.collection("uploadImages").insertOne({...uploadResponse , albumId: id});
    //image[{"url":_________}] 
    //id of album
    //findOne

    response.status(200).json({
      status: 200,
      message:"new image added",
      data:{...uploadResponse , albumId: id}
    })

  }catch(err){
    response.status(400).json({
      status: 400,
      message: "new image cannot be add",
    });
    console.log(err.stack);
  }
};

// //get all images from cloudinary---------------------------not 
// const getAllimages = async (request, response) =>{

//   try{
//     const {resources} = await cloudinary.search.expression('folder: final_project')
//     .sort_by('public_id','desc')
//     .max_results(30)
//     .execute();

//     const publicIds = resources.map((file) => file.url);
//       response.status(200).json({
//         stauts:200,
//         data: publicIds,
//         message: "images found"
//     })
//   }catch(err){
//       response.status(400).json({
//         stauts: 400,
//         message: "something went wrong"
//       })
//   }
// };

//updated(add) image url to album-------------------------------------------
const updatedImageUrls = async(request, response) =>{
  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("final_blog");

    const {id, url} =request.body;
    const existingAlbum = await db.collection("albums").findOne({ id });
    if(existingAlbum){
      const newUrls = [...existingAlbum.url, url];
      const updatedUrls = {$set:{url:newUrls}}
      await db.collection("albums").updateOne({id}, updatedUrls)
    }
    
    response.status(200).json({
      status: 200,
      ...request.body,
      message: "image url updated",
    });
    
  }catch(err){
    console.log("error", error)
  }
};

//update images------------------------------------------------
const updatedImage = async (request, response) =>{
  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db =client.db("final_blog");

    //grab the album
    const {id, url} = request.body;
    const findAlbum = await db.collection("albums").findOne({id});
    // console.log("findAlbum",findAlbum)

    //get old url from album
    const oldUrls = findAlbum.url

    //filter item we dont want in the album, 如果不等於(!==)想刪除的item, 留下
    const updatedUrl = oldUrls.filter(item =>item !== url)

    const setUpdatedUrls = {$set:{url:updatedUrl}}
    await db.collection("albums").updateOne({id}, setUpdatedUrls )

      response.status(200).json({
          status: 200,
          data:updatedUrl,
          message: "image updated"
      })
  
    client.close();
  }catch(err){
    console.log(err.stack);
  }
};


//Get user------------------------------------------------------
const getSigninUser = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  const LoginEmail = request.params.id;
  const { email, name, picture } = request.body;

  try {
    await client.connect();
    const db = client.db("final_blog");

    //findOne (using email) within collection of users
    //If find one, respond with that found user object
    const result = await db.collection("users").findOne({ email });
    // console.log("result", result);

    if (result) {
      response.status(200).json({
        status: 200,
        data: result,
        message: "user found",
      });
    } else {
      const newUser = await db.collection("users").insertOne(request.body);
      // console.log("newUser", newUser);

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
  getPostComments,
  addNewAlbum,
  getAllAlbums,
  getSinglealbum,
  updatedImageUrls,
  uploadImage,
  updatedImage,
  // getAllimages,
};
