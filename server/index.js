"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  
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
    .get("/", (request, response)=>{
        response.send("Hello Hello");
    })

    // .get("/api/get-flights", getFlights) //all flight numbers
    // .get("/api/get-flight/:_id", getFlight) //flight numbers w/ seating data 
    // .get("/api/get-reservations", getReservations)
    // .get("/api/get-reservation/:id", getSingleReservation)

    // .post("/api/add-reservation", addReservation)

    // .patch("/api/update-reservation", updateReservation)

    // .delete("/api/delete-reservation/:id", deleteReservation)



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