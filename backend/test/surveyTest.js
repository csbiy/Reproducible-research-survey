const assert = require('assert');
const mysql = require("mysql");
const connectionInfo = require("../config/database")
const dao = require("../persistence/dao/surveyDao")
const dateFormater = require("dateformat");
const surveyForm = require("../model/survey/surveyForm");

// describe('Database Connection Test',function(){
//     describe("#createConnection()",function(){
//         it('sholud connect database',function(done){
//             let connection = mysql.createConnection(connectionInfo);
//             connection.connect(done);
//         })
//     })
// })


describe("Survey",function(){
    describe("#createSurvey",function(){
        it("should create Survey",function(){
            let connection = mysql.createConnection(connectionInfo);
            connection.connect();
            console.log("connect")
            connection.beginTransaction(function(err){
            
                if(err) {
                    connection.rollback();
                    assert.fail();
                }
                // given 
                surveyForm.surveyCompleteTime = dateFormater(Date.now(),"yyyy-mm-dd HH:MM:ss");
                surveyForm.surveyStartTime = dateFormater(Date.now(),"yyyy-mm-dd HH:MM:ss");
                surveyForm.email  = "test"
                surveyForm.emailDomain= "gmail"
                surveyForm.name ="testUser"
                surveyForm.experimentType ="testExp"
                surveyForm.figureComment =["table1" , "table2"];
                surveyForm.figureCommentTxt =["testOpinion1" , "testOpinion2"];
                surveyForm.dataIntegrityScore=(Math.random() * 5);
                surveyForm.timeSaveScore = (Math.random() * 5);
                surveyForm.reflectOpnionScore =(Math.random() * 5);
                surveyForm.satisfyScore = (Math.random() * 5);
                surveyForm.responseTimeScore = (Math.random() * 5);
                dao.createSurvey(surveyForm,()=>                //when 
                connection.query(
                    `
                    select
                        t.email,t.name,f.figure_name,f.figure_txt
                    from
                        tgi_survey t
                    inner join tgi_figure_comment f
                    on t.id = f.tgi_survey_id
                    where t.email = 'test@gmail';

                    `
                ,function(err,rows,fields){
                    if(err){
                        console.error(err);
                        connection.rollback();
                        assert.fail();
                    }
                    //then
                    assert.strictEqual(rows.length == 6 ,true);
                    assert.strictEqual((rows[0].name == "testUser" && rows[1].name == "testUser"),true);
                    assert.strictEqual((rows[0].figureComment === "table1"  && row[1].figureComment === "table2"),true);
                    connection.rollback();
                }));

               
            })

        })
    })
})

