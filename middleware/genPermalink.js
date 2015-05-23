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
    
    if(newPost.draft === 'on'){
        newPost.draft = true;
    } else {
        newPost.draft = false;
    }

    newPost.permalink = user.username + '/' + title;
    newPost.author = user.username;
    newPost.date = new Date();

    console.log(req.body);

    next();

}