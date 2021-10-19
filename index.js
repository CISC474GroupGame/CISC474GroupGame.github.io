#!/usr/bin/env node
const express = require('express')
//  const expressSession = require('express-session') // TODO: session handling either with firebase or express
const admin = require("firebase-admin");
const serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://cisc474-platformer-game-default-rtdb.firebaseio.com"
});


app.get("/user/:uuid",(req,res)=>{
        const uuid = req.params.uuid;

        res.json({ failed: true, result: "To be implemented." })
        res.end()
})
app.put("/user/:uuid",(req,res)=>{
        const uuid = req.params.uuid;

        res.json({ failed: true, result: "To be implemented." })
        res.end()
})
app.post("/user/:uuid",(req,res)=>{
        const uuid = req.params.uuid;

        res.json({ failed: true, result: "To be implemented." })
        res.end()
})

app.delete("/user/:uuid",(req,res)=>{
        const uuid = req.params.uuid;

        res.json({ failed: true, result: "To be implemented." })
        res.end()
})