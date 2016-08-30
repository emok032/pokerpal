// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         xoauth2: xoauth2.createXOAuth2Generator({
//             user: '{username}',
//             clientId: '{Client ID}',
//             clientSecret: '{Client Secret}',
//             refreshToken: '{refresh-token}',
//             accessToken: '{cached access token}'
//         })
//     }
// });


// // verify connection configuration
// transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Email server ready!');
//    }
// });



// // create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// // setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });