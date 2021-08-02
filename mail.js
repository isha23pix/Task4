const nodemailer= require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const auth={
    auth: {
        api_key:'51b992a0510a0836a2b785ed3551ea52-a0cfb957-39e3a9b6',
        domain:'sandboxb7ab9832069a46798bc8707a973237e2.mailgun.org',
    }
};

const transporter = nodemailer.createTransport(mailgun(auth));

const sendMail= (email, subject, text,cb)=>{
    const maildet= {
        from: email,
        to:'ishasamal23@gmail.com',
        subject,
        text
    };
    
    transporter.sendMail(maildet, function(error, data){
        if(error){
            cb(error, null);
        }
        else{
            cb(null, data);
        }
    });
}

module.exports = sendMail;