module.exports = function genPermalink(req, res, next){
    var thisPost = req.body,
        user = req.session.user;
        array = thisPost.title.split(' '),
        title = '';

    for(var i=0; i<array.length; i++){
        var length = array[i].length + 1;
        title += array[i].substr(0,1).toUpperCase();
        title += array[i].substr(1, length);
    }
    
    if(thisPost.draft === 'on'){
        thisPost.draft = true;
    } else {
        thisPost.draft = false;
    }

    thisPost.permalink = title;
    thisPost.author = user.username;
    thisPost.date = new Date();

    console.log(req.body);

    next();

}