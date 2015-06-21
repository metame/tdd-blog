module.exports = function cleanTags(req, res, next){
    var thisTags = req.body.tags;
    
    // remove spaces after commas to normalize tag strings
    for(var i=0; i<thisTags.length; i++){
        if(thisTags[i] === ',' && thisTags[i+1] === ' '){
            thisTags = thisTags.substr(0, i+1) + thisTags.substr(i+2, thisTags.length);
        }
    }
    
    thisTags = thisTags.split(',');
    req.body.tags = thisTags;
    console.log(req.body);
    
    next();
}