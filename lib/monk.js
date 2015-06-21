var db = require('monk')('localhost:27017/blog'),
    users = db.get('users'),
    tags = db.get('tags');

users.index('username',{unique: true});
users.index('email',{unique: true});
tags.index('tag',{unique: true});
    
module.exports = db;