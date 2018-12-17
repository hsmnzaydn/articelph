const constant=require('../Utils/Constants')

module.exports={startApplication}

async function startApplication(req,res,next) {
    res.send({
        code:global.OK_CODE,
        message:global.OK_MESSAGE
    })
}