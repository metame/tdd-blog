module.exports = function genPermalink(req, res, next){
    var newPost = req.body,
        user = req.session.user;
        array = newPost.title.split(' '),
        title = '';

    for(var i=0; i<array.length; i++){
        var length = array[i].length + 1;
        title += array[i].substr(0,1).toUpperCase();
        title += array[i].substr(1, length);
    }

    req.body.permalink = user.username + '/' + title;
    req.body.author = user.username;
    req.body.date = new Date();

    console.log(req.body);

    next();

}