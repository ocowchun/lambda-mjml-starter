// require('babel-register');
var fs = require('fs');
var mjmlEngine = require('mjml')
var _ = require('underscore');
var sendMail = require('./common/sendMail.js');

const BASE_PATH = process.env.BASE_PATH || '../src/mjml/';
const MAIL_PATH = BASE_PATH + 'hello.mjml';
var MAIL_TEMPLATE = fs.readFileSync(MAIL_PATH).toString();
var compiled = _.template(MAIL_TEMPLATE);

function send() {
  var mjml = compiled({
    name: 'moe'
  });
  var html = mjmlEngine.mjml2html(mjml);
  var data = {
    html: html
  };
  return sendMail.send(data);
}

module.exports = send;


// send().then(console.log)
