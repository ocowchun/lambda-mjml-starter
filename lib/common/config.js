var _ = require('underscore');
var Promise = require('bluebird');
var AWS = require('./aws.js');
var dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

var params = {
  TableName: 'lambda_config',
  Key: {
    id: {
      S: 'mjml101'
    }
  }
};

function fetch() {
  return new Promise(function(resolve, reject) {
    dynamodb.getItem(params, function(err, data) {
      if (err) reject(err, err.stack); // an error occurred
      else {
        var item = data.Item;
        var keys = _.keys(item);
        var result = _.reduce(keys, function(memo, key) {
          memo[key] = item[key]['S'];
          return memo;
        }, {});

        resolve(result); // successful response
      }
    });
  });
}

module.exports = fetch
