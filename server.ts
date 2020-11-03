

import * as express from 'express';
import {Application} from "express";

const app: Application = express();


const members = [
    {
        "_id": "34ed9890-1af8-11eb-9619-7bd0236f9c77",
        "firstname": "fn 1",
        "lastname": "ln 1",
        "team": "team 1",
        "jobtitle": "job 1",
        "status": "active",
        "created": "2020-11-02T15:30:46.781Z",
        "modified": "2020-11-02T15:30:46.781Z"
    },
    {
        "_id": "34ee34d0-1af8-11eb-9619-7bd0236f9c77",
        "firstname": "fn 2",
        "lastname": "ln 2",
        "team": "team 2",
        "jobtitle": "job 2",
        "status": "active",
        "created": "2020-11-02T15:30:46.781Z",
        "modified": "2020-11-02T15:30:46.781Z"
    },
    {
        "_id": "34ee82f0-1af8-11eb-9619-7bd0236f9c77",
        "firstname": "fn 3",
        "lastname": "ln 3",
        "team": "team 3",
        "jobtitle": "job 3",
        "status": "active",
        "created": "2020-11-02T15:30:46.781Z",
        "modified": "2020-11-02T15:30:46.781Z"
    },
    {
        "_id": "34eef820-1af8-11eb-9619-7bd0236f9c77",
        "firstname": "fn 4",
        "lastname": "ln 4",
        "team": "team 4",
        "jobtitle": "job 4",
        "status": "active",
        "created": "2020-11-02T15:30:46.781Z",
        "modified": "2020-11-02T15:30:46.781Z"
    },
    {
        "_id": "34ef6d50-1af8-11eb-9619-7bd0236f9c77",
        "firstname": "fn 5",
        "lastname": "ln 5",
        "team": "team 5",
        "jobtitle": "job 5",
        "status": "active",
        "created": "2020-11-02T15:30:46.781Z",
        "modified": "2020-11-02T15:30:46.781Z"
    }
];
const teams = [
    {
        "_id": "6a559fa0-1af8-11eb-b390-1fcbc5d538a1",
        "teamname": "team 1"
    },
    {
        "_id": "6a577460-1af8-11eb-b390-1fcbc5d538a1",
        "teamname": "team 2"
    },
    {
        "_id": "6a57e990-1af8-11eb-b390-1fcbc5d538a1",
        "teamname": "team 3"
    },
    {
        "_id": "6a5837b0-1af8-11eb-b390-1fcbc5d538a1",
        "teamname": "team 4"
    },
    {
        "_id": "6a5885d0-1af8-11eb-b390-1fcbc5d538a1",
        "teamname": "team 5"
    }
]
app.get('/api/members',(req,res,next)=>{
    res.send(members)
});
app.get('/api/members/:id',(req,res,next)=>{
    res.send(members[4])
});
app.post('/api/members',(req,res,next)=>{
    res.send(members[4])
});
app.put('/api/members/:id',(req,res,next)=>{
    res.send(members[4])
});
app.delete('/api/members',(req,res,next)=>{
    res.send(members[4])
});
app.get('/api/teams',(req,res,next)=>{
    res.send(teams)
});
app.get('/api/teams/:id',(req,res,next)=>{
    res.send(teams[4])
});
app.post('/api/teams',(req,res,next)=>{
    res.send(teams[4])
});

const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




