var request = require('superagent'),
    expect = require('expect.js'),
    db = require('../../lib/monk'),
    users = db.get('users'),
    posts = db.get('posts'),
    genPermalink = require('../../middleware/genPermalink');

describe('edit blog post', function(){
    var u = 'editpostuser',
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
    
    // Define new post
    var newPost = {'title': 'New blog post', 'body': 'Yes! This post worked!'};

    // Insert new post to be edited
    describe('Submit New Post', function(){

        it('should accept valid entry', function(done){

            agent
            .post('localhost:8080/users/newpost')
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
    
    describe('Edit post page', function(){
        it('should exist and show form with valid permalink', function(done){
            
            agent
            .get('localhost:8080/users/edit/NewBlogPost')
            .end(function(err, res){
                expect(err).to.not.exist;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect('form').to.exist;

                done();
            });
        });

        /* TODO: test for invalid permalink */
    });
    
    // define edited post
    var e = "edited post",
    editedPost = {"title":e,"body":e};
    
    describe('edited post', function(){
        it('should post and have res', function(done){
            
            agent
            .post('localhost:8080/users/edit/NewBlogPost')
            .type('form')
            .send(editedPost)
            .end(function(err, res){
                expect(err).to.not.exist;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                

                done();
            });
        });
        
        it('should be saved in the db', function(done){
            posts.findOne(editedPost).success(function(doc){

                expect(doc).to.exist;
                expect(doc.title).to.equal(editedPost.title);
                expect(doc.body).to.equal(editedPost.body);
                expect(doc.author).to.equal(u);
                expect(doc.date).to.be.an('object');

                done();
            });
        });
        
        it('should have replaced original post in db', function(done){
            posts.findOne(newPost).success(function(doc){

                expect(doc).to.not.exist;
                
                done();
            });
        });
    });

    after(function(){
        users.remove(user);
        posts.remove(editedPost);
    });

});