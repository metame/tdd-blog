var db = require('monk')('localhost:27017/blog'),
    users = db.get('users');

users.index('username',{unique: true});
users.index('email',{unique: true});
    
module.exports = db;