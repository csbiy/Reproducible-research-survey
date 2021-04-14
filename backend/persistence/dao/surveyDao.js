
const connectionConfigInfo  = require("../../config/database")
let surveyForm = require("../../model/surveyForm");
const dateFormater = require("dateformat");
const mysql = require('mysql2');

let connection = mysql.createConnection(    
    {
    host:"172.21.0.2",
    user: "root",
    password: "1234",
    database: "survey",
    }
    );
connection.connect(function (err) {
    console.error(err);
    if (err) throw err;
    getScore();
});


function createSurvey(surveyForm,callBack) {

    const fkIndex = 0;
    let fk;
    let figureCommentList = [];
    connection.beginTransaction(function (err) {
        if (err) {
            throw err
        };
        const query = `INSERT INTO tgi_survey(survey_start_time,survey_complete_time,email,name,time_save_score,data_integrity_score,reflect_opnion_score,response_time_score,satisfy_score,user_opinion) values (${"'" + surveyForm.surveyStartTime + "'"},${"'" + surveyForm.surveyCompleteTime + "'"},${"'" + surveyForm.email + "@" + surveyForm.emailDomain + "'"}, ${"'" + surveyForm.name + "'"} , ${surveyForm.timeSaveScore},${surveyForm.dataIntegrityScore},${surveyForm.reflectOpnionScore},${surveyForm.responseTimeScore},${surveyForm.satisfyScore},${"'" + surveyForm.userOpinion + "'"})`
        connection.query(query, function (err, rows, fields) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                })
            };
            connection.query("select LAST_INSERT_ID() as fk", function (err, rows, fields) {
                if (err) {
                    return connection.rollback(function () {
                        throw err;
                    })
                }
                fk = rows[fkIndex].fk;
                console.log(surveyForm);
                for (let i = 0; i < surveyForm.figureCommentTxt.length; i++) {
                    figureCommentList.push([surveyForm.figureComment[i], surveyForm.figureCommentTxt[i], fk]);
                }
                connection.query("INSERT INTO tgi_figure_comment(figure_name,figure_txt,tgi_survey_id) values ? ", [figureCommentList], function (err, rows, fields) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        })
                    }
                    connection.commit(function (err) {
                        callBack();
                        if (err) {
                            return connection.rollback(function () {
                                throw err;
                            })
                        }
                    })
                })

            })
        });
    })
}
function createSurveyFormDto(req) {
  
    surveyForm.surveyStartTime = req.cookies.surveyStartTime;
    surveyForm.surveyCompleteTime = dateFormater(Date.now(), "yyyy-mm-dd HH:MM:ss");
    for (let property in req.body) {
        if ((property == "figureComment" || property == "figureCommentTxt") && typeof req.body[property] == 'string') {
            surveyForm[property] = [req.body[property]];
            continue;
        }
        surveyForm[property] = req.body[property];
    };
    return surveyForm;
}
function getScore(){
    return new Promise((resolve,reject)=>{
        connection.query("select time_save_score,data_integrity_score,reflect_opnion_score,response_time_score,satisfy_score from tgi_survey",function(err,rows,fields){
            if(err) {
                console.error(err);
                reject(err);
            }
            let scoreAvgAndTotalCntDto= []
            let timeSaveScoreSum = 0;
            let dataIntegrityScoreSum = 0;
            let reflectOpnionScoreSum = 0;
            let responseTimeScoreSum = 0;
            let satisfyScoreSum = 0;
            rows.map(row=>{
                if(row.time_save_score != -1){
                    timeSaveScoreSum += row.time_save_score;
                }if(row.data_integrity_score != -1){
                    dataIntegrityScoreSum +=row.data_integrity_score;
                }if(row.reflect_opnion_score != -1){
                    reflectOpnionScoreSum +=row.reflect_opnion_score; 
                }if(row.response_time_score != -1){
                    responseTimeScoreSum += row.response_time_score;
                }if(row.satisfyScore != -1){
                    satisfyScoreSum+= row.satisfy_score;
                 }
                });
            scoreAvgAndTotalCntDto.push({
                reflectOpnionScoreAvg: Math.round(reflectOpnionScoreSum/rows.length*100)/100,
                responseTimeScoreAvg: Math.round(responseTimeScoreSum/rows.length*100)/100 ,
                dataIntegrityScoreAvg: Math.round(dataIntegrityScoreSum/rows.length*100)/100,
                timeSaveScoreAvg :Math.round(timeSaveScoreSum/rows.length*100)/100,
                satisfyScoreAvg : Math.round(satisfyScoreSum/rows.length*100)/100,
                },{
                    totalSurveyCnt : rows.length
            });
            resolve({scoreAvgAndTotalCntDto});
        })
    })
}

module.exports = {
    createSurvey,
    createSurveyFormDto,
    getScore
};