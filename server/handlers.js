"use strict";

const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({path: "./.env"});
// require("dotenv").config({path: "../.env"});

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
// import {makeNewPostObjec} from "./utility";

//----------------------------------------------------------------
const getAllPosts = async (request, response) =>{
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        const db = client.db("final_blog");

        const postInfo = await db.collection("posts").find().toArray();
        const result =[]
            postInfo.forEach((post)=>{
                result.push(post)
            })

            if(result){
                response.status(200).json({ 
                    status: 200,
                    data: result,
                    message:"posts found"
                });
            }
            else{
                response.status(404).json({
                    starus:404,
                    message: "posts not found"
                })
            }
            client.close();
            console.log("getAllPosts disconnected!");
        }
        catch(err){
            console.log(err.stack);
        }
};

//-------------------------------------------------------------------------

const addNewPost = async (request, response)=>{

    const client = new MongoClient(MONGO_URI, options);
    // const newPostEntry = makeNewPostObjec(request.body)

    try{
        await client.connect();
        const db = client.db("final_blog");


        client.close();
        console.log("addNewPost disconnected!");
    }
    catch(err){
        console.log(err.stack);
    }
};


module.exports = {
    getAllPosts,
    addNewPost,
};