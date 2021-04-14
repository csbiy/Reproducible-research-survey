const express = require('express');
const { createSurvey , getScore , createSurveyFormDto} = require("../persistence/dao/surveyDao")
const router = express.Router()
const RESOURCE_CREATED = 201;
router.get("/", (req, res ,next) => {
     getScore()
        .then((data) => res.json(data))
        .catch((error) => console.error(error));
})


router.post("/",(req, res , next) => {
        console.info("survey end")
        let surveyForm= createSurveyFormDto(req);
        createSurvey(surveyForm);
        res.status(RESOURCE_CREATED).json({
            "description" : "ok",
        });
})

module.exports = router;