const nodemailer = require('nodemailer');
      require('dotenv').config({path: './process.env'});  
let   transporter;
      constant=require('./Constants')


transporter=nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth:{
        user:process.env.MAIL_ADDRESS,
        pass:process.env.MAIL_ADDRESS_PASS
    },
    tls:{
        rejectUnauthorized: false
    }

});


module.exports.sendMail=function(to){
    let HelperOptions={
        from:process.env.MAIL_ADDRESS,
        to:to,
        subject:global.MAIL_SUBJECT,
        text: global.MAIL_TEXT
    };
    
    transporter.sendMail(HelperOptions, function(error, info){
        if (error) {
          console.log(error);

        } else {
          console.log('Sended mail to: '+ HelperOptions.to);
        }
      });
}





