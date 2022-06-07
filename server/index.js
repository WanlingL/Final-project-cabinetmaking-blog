"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
    getAllPosts,
    getSinglePost,
    addNewPost,
    getSigninUser,
    updatePost,
    addComment,
} = require("./handlers");

express()
    // Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    // ---------------------------------
    // .get("/", (request, response)=>{
    //     response.send("Hello Hello 123456");
    // })


    .get("/api/get-blog-posts", getAllPosts)

    .get("/api/get-blog-post/:id", getSinglePost)

    .post("/api/add-post", addNewPost)

    .patch("/api/edit-post/:id", updatePost)

    .post("/api/comment-on-post", addComment)

    // .post("/api/add-album", addNewAlbum)

    // .patch("/api/edit-album", updateAlbum)

    .post("/api/signin/:id", getSigninUser)  

    // ---------------------------------

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(8000, () => console.log(`Listening on port 8000`));