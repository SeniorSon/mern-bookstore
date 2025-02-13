import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all records.
router.get("/", async(req, res) => {
    let collection = await db.collection("books");
    let results = await collection.find({}).toArray();

    res.send(results).status(200);
});

// Get a single record by id.
router.get("/:id", async(req, res)=> {
    let collection = await db.collection("books");
    let query = { _id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Create a new record.
router.post("/", async(req, res) => {
    try {
        let book = {
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            pages: req.body.pages,
            genres: req.body.genres,
            reviews: req.body.reviews,
        };

        let collection = await db.collection("books");
        let result = await collection.insertOne(book);

        res.send(result).status(204);
    }catch(err) {
        console.error(err);
        res.status(500).send("Could not create a new record");
    }
});

// Update a record by id.
router.patch("/:id", async(req, res) => {
    try {
        let query = { _id: new ObjectId(req.params.id) };
        const updates  = req.body;

        let collection = await db.collection("books");
        let result = await collection.updateOne(query, {$set: updates});

        res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Could not update the record");
    }
});

// Delete a record by id.
router.delete("/:id", async(req, res) => {
    try {
        let query = { _id: new ObjectId(req.params.id)};
       
        let collection = await db.collection("books");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Could not delete the record");
    }
});

export default router;