import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
import cors from 'cors';
require('dotenv').config();
let app=express();
//config app


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({ credentials: true, origin: true }));


viewEngine(app);
initWebRoutes(app);
connectDB()


let port = process.env.PORT || 6969;    // port === undefined => 6969
app.listen(port, () =>{
    console.log("Server run in port: "+ port)
})