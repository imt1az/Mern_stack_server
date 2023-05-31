const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const mg = require('mailgun-js');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host:'smtp-relay.sendinblue.com',
    port:587, // no need to set host or port etc.
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
// const mailgun = () =>
//   mg({
//     apiKey: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMIAN,
//   });

const registerEmail = async(userEmail,user,token)=>{    
    try{
       const emailToken = user.generateRegisterToken();
       console.log(emailToken);
       
       let mailGenerator = new Mailgen({
        theme:"default",
       product:{
        name:"Life Needed",
        link:`${process.env.EMAIL_MAIL_URL}`
       }
       })

       const email = {
        body:{
            name:userEmail,
            intro:'Welcome to Life Needed',
            action:{
                instruction:'To get validate your account,please click here',
               
                button:{
                    color:'#1a73e8',
                    text: 'Validate your account',
                    link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                }
            },
            
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
       }

       let emailBody = mailGenerator.generate(email)
       let message = {
       
        to:userEmail,
        from:'imtiazemon625@gmail.com',
        subject:'Welcome Life Needed',
        html:emailBody
       }
       await transporter.sendMail(message);

    // await mailgun().messages().send(message)

       return true;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    registerEmail
}