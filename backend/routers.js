const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User= require('./module');
const check= require('./userss');
const checkhead= require('./head');

router.post("/enter",async (req, res) => {
    try {
        const db = req.db;
        
       
        const { district, stream, course, zValue1, zValue2 } = req.body;


       
        const document = {
            district,
            stream,
            course,
            zValue1,
            zValue2,
        };
       
      
        const result = await db.collection("customers").insertOne(document);

        console.log("Document inserted:", result.insertedId);
        res.status(201).json({
            message: "Document inserted successfully",
            id: result.insertedId,
        });
    } catch (err) {
        console.error("Error inserting document:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/details", async (req, res) => {
    try {

        if (mongoose.connection.readyState !== 1) {
            throw new Error("Mongoose is not connected to MongoDB");
          }
        const users = await User.find(); // Fetch all users
      

      

        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/api/deleteuser/:id"  , async (req,res) => {
    console.log("request detected");
    try{
        const db = req.db;
        const {id} =req.params;
        const result = await db.collection("customers").deleteOne({_id:new mongoose.Types.ObjectId(id)});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Delete successful");
    }catch(error)
    {
        console.log("error during deleting" , error);
    }
})
let findResults = [];

router.post("/find", async (req, res) => {
    const { district, stream, zValue } = req.body;

    try {
        const users = await User.find({
            district,
            stream,
            zValue1: { $lte: zValue },
            zValue2: { $gte: zValue },
        });

        if (users.length > 0) {
          
            findResults = users
            res.status(200).json({ users });
        } else {
            res.status(404).json({ message: "No users found." });
        }
    } catch (err) {
        console.error("Error in /find:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/getdetails", async (req, res) => {
    
    try {
        
      if (findResults.length >= 0) {
        
        res.status(200).json({ users: findResults });
      } else {
        res.status(404).json({ message: "No data found. Perform a search first." });
      }
    } catch (err) {
      console.error("Error in /getdetails:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
router.post("/feedback" , async(req,res) =>
{
    try{
    const db = req.db;
    const { name , email , message} = req.body;   
    const document = {
        name,
        email,
        message,
    };
    console.log(document);
  
    const result = await db.collection("feedback").insertOne(document);

    console.log("Document inserted:", result.insertedId);
    res.status(201).json({
        message: "Document inserted successfully",
        id: result.insertedId,
    });
} catch (err) {
    console.error("Error inserting document:", err);
    res.status(500).json({ message: "Internal server error" });
}
   
})
router.post("/adduser", async(req,res)=>
{
    console.log("harre")
    try{
        const db = req.db;
        
       
     
        const {username, email,password}=req.body;

       
        const document = {
            username,
            email,
            password
        };
        const result = await db.collection("users").insertOne(document);


        console.log("Document inserted:", result.insertedId);
        res.status(201).json({
            message: "Document inserted successfully",
            id: result.insertedId,
        });
    } catch (err) {
        console.error("Error inserting document:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})
router.post("/checkuser", async(req,res) =>
{
    console.log("vada");
    const db=req.db;

    const { email ,password} = req.body;

    try {
        const usersa = await check.find({
            email,
            password,
            
        });

        if (usersa.length > 0) {
            console.log("vada");
            res.status(200).json({ usersa });
        } else {
            res.status(404).json({ message: "No users found." });
        }
    } catch (err) {
        console.error("Error in /find:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})







router.post("/addhead", async(req,res)=>
    {
        console.log("harre")
        try{
            const db = req.db;
            
           
    const {username, email,password,possition}=req.body;
    
           
            const document = {
                username,
                email,
                password,
                possition
            };
            const result = await db.collection("head").insertOne(document);
    
    
            console.log("Document inserted:", result.insertedId);
            res.status(201).json({
                message: "Document inserted successfully",
                id: result.insertedId,
            });
        } catch (err) {
            console.error("Error inserting document:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    })
    router.post("/checkhead", async(req,res) =>
    {
        console.log("vadas");
        const db=req.db;
    
        const { email ,password} = req.body;
    
        try {
            const usersaa = await checkhead.find({
                email,
                password,
                
            });
    
            if (usersaa.length > 0) {
                console.log("vada");
                res.status(200).json({ usersaa });
            } else {
                res.status(404).json({ message: "No users found." });
            }
        } catch (err) {
            console.error("Error in /find:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    })
    


module.exports = router;
