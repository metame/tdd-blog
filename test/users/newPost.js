var request = require('superagent'),
    expect = require('expect.js'),
    db = require('../../lib/monk'),
    users = db.get('users'),
    posts = db.get('posts'),
    genPermalink = require('../../middleware/genPermalink');

describe('new blog post', function(){
    var u = 'newpostuser',
        user = {'username': u, 'password': u, 'email': u + "@test.com"};
    
    // Make sure db is clean to avoid errors
    before(function(){
        users.remove(user);
    });
    
    // seed db with test user
    before(function(done){
        users.insert(user).success(function(doc){
            expect(doc).to.exist;
            expect(doc.username).to.equal(u);

            done();
        });
    });

    // define agent
    var agent = request.agent();

    // login user agent before running tests
    before(function(done){
        agent
        .post('localhost:8080/users/login')
        .type('form')
        .send(user)
        .end(function(err, res){
            if(err) throw err;
            if(res) done();
        });
    });

    describe('New post page', function(){
        it('should exist and show form', function(done){
            
            agent
            .get('localhost:8080/users/newPost')
            .end(function(err, res){
                expect(err).to.not.exist;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect('form').to.exist;
                
                done();
            });
        });
    });
    
    // Define new post
    var newPost = {'title': 'Test blog post', 'body': 'Yes! This post worked!'};

    describe('Submit New Post', function(){

        it('should accept valid entry', function(done){

            agent
            .post('localhost:8080/users/newPost')
            .type('form')
            .send(newPost)
            .end(function(err, res){
                expect(err).to.not.exist;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain(newPost.title);
                
                done();
            });
        });

        it('should be saved in the db', function(done){
            posts.findOne(newPost).success(function(doc){

                expect(doc).to.exist;
                expect(doc.title).to.equal(newPost.title);
                expect(doc.body).to.equal(newPost.body);
                expect(doc.author).to.equal(u);
                expect(doc.date).to.be.an('object');

                done();
            });
        });
    });

    after(function(){
        users.remove(user);
        posts.remove(newPost);
    });

});