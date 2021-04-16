
require('dotenv').config();
const express = require("express");
const sanitizeHtml = require('sanitize-html');
const csurf = require('csurf');
const path = require('path');
const cookieParser = require('cookie-parser');
const dateFormater = require("dateformat");
const multer = require('multer');
const {resolve,join} = require("path");
const survey = require("./routes/survey");
const { getScore } = require("./persistence/dao/surveyDao");
const logger = require('./logger');
const upload = multer();
const app = express();
const CLIENT_ERROR = 400;
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(upload.array());
app.use(express.static('./public'));

const csrfProtection = csurf({cookie:true});


app.use((req,res,next)=>{
    logger.info(req.url);
    next();
})

app.use('/survey',survey);
app.listen(process.env.SERVER_PORT);
app.get("/",csrfProtection, (req, res) => {
    console.info("survey start")
    res.setHeader(`Set-Cookie`, `surveyStartTime=${dateFormater(Date.now(), "yyyy-mm-dd HH:MM:ss")}; csrfToken=${req.csrfToken()}`);
    res.sendFile(sanitizeHtml(path.join(__dirname, "/public/html/index.html")));
})


app.use((req,res,next)=>{
    res.status(CLIENT_ERROR).sendFile(__dirname,"public/html/error.html");
})

app.use((err,req,res,next)=>{
    if(err){
        res.status(CLIENT_ERROR).sendFile(__dirname,"public/html/error.html");
    }
})