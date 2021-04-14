const {createLogger , format , transports } = require('winston');
const logger = createLogger({
    level : 'info',
    format : format.json(),
    transports : [
        new transports.File({ filename : './log/survey.log'}),
        new transports.File({ filename : 'error.log' , level : 'error'})
    ]
})

module.exports = logger;