var send = require('../../lib/send_hello.js');

console.log('starting function')
exports.handle = function(e, ctx, cb) {
  send().then(function(result) {
    cb(null, result);
  }).catch(cb)
}
