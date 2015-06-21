var db = require('../lib/monk'),
    tags = db.get('tags');
    
module.exports = function addTagsToDb(req, res, next){
    var thisTags = req.body.tags,
        thisPost = req.body.permalink;
        
    if(thisTags[0]){
        if(!req.body.draft){
            thisTags.forEach(function(tag){
                // check to see if tag has already been inserted for this post to maintain idempotency
                tags.findOne({"tag": tag, "posts": thisPost}).success(function(doc){
                    // if no doc found, upsert the tag and increment tag frequency
                    if(!doc){
                        tags.update({"tag": tag},{"$inc":{"freq": 1}, "$push":{"posts": thisPost}},{upsert: true}).success(function(updated){
                        });
                    }
                });
            });
        }
    }
    next();
}