var fs = require('fs');
var _ = require('underscore');
var fetchConfig = require('./config.js');
var request = require('request');

function sendMail(config, data) {
    //Your api key, from Mailgun’s Control Panel
    var api_key = config.MAILGUN_API_KEY;
    //Your domain, from the Mailgun Control Panel
    var domain = config.MAILGUN_DOMAIN;
    //Your sending email address
    var from_who = 'ben.yeh@sudo.com.tw';

    var data = {
        //Specify email data
        from: from_who,
        //The email to contact
        to: 'ben.yeh@sudo.com.tw', //Subject and text data
        subject: '[測試]Weekly Report(2016/05/23-2016/05/29) for Sudo Inc,',
        html: data.html
    }

    return new Promise(function(resolve, reject) {
        var url = 'https://api.mailgun.net/v3/' + domain + '/messages'
        var options = {
            url: url,
            method: 'POST',
            formData: data,
            auth: {
                user: 'api',
                pass: api_key
            }
        }
        request(options, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(response.body);
            }

        });
    });


}

function send(data) {
    return fetchConfig().then(function(config) {
        return sendMail(config, data);
    })
}


module.exports.send = send;
