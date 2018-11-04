const dateFormat = require('dateformat');

module.exports={logger}


async function logger(req,res,next) {
    console.log("\n-----------------------\n"+dateFormat(parseInt(new Date().getTime()), "dd/mm/yyyy HH:MM:ss") + " \nReq url: " + req.url + "\n" + "Authorization: " + req.headers['authorization'] + "\n" + "Udid: " + req.headers['udid'] + "\n" +
        "Request Method: "+req.method+ "\nBody:" + JSON.stringify(req.body));
    next();
}