var path = require('path'),
    templatesDir = path.resolve(__dirname, '.', 'templates'),
    nodemailer = require('nodemailer'),
    emailTemplates = require('email-templates');

module.exports.sendConfirmationEmail = function(address, confirmURL) {
    emailTemplates(templatesDir, function(err, template) {
        // ## Send a single email
        console.log('Send confirmation to ' + address);

        // Prepare nodemailer transport object
        var transport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: "carpoolingtest1@gmail.com",
                pass: "asdfasdf1231234"
            }
        });

        var values = {
            email: address,
            name: address,
            url: confirmURL
        };

        template('default', values, function(err, html, text) {
            if (err) {
                console.log(err);
            }
            else {
                transport.sendMail({
                    from: 'Carpooling <carpoolingtest1@gmail.com>',
                    to: values.email,
                    subject: 'Confirm your carpool.',
                    html: html,
                    text: text
                }, function(err, responseStatus) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(responseStatus.message);
                    }
                });
            }
        });
    });
};
