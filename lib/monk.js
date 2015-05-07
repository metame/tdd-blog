var db = require('monk')('localhost:27017/blog');
    users = db.get('users'),;
    
module.exports.users = users;