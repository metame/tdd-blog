var db = require('../lib/monk'),
    tags = db.get('tags');

// thoughts on implementation - could put tags collection in with incremented counter
// this has benefit of easy data access patterns
// the logic to assign size to the tags is perhaps the most difficult
// a simple solution could be a ratio of tagcount to font-size with a maximum
// but this would not scale well over time as that percentage would have to be lower and lower
// a better solution may be to assign a static font-size based on rank
module.exports = function rankTags(req, res, next){
    tags.
}