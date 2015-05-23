var request = require('superagent'),
    expect = require('expect.js'),
    db = require('../../lib/monk'),
    users = db.get('users'),
    posts = db.get('posts');

describe('User Dashboard', function(){
    // Define user and agent for test
    var u = 'dashtest',
        user = {'username': u, 'password': u, 'email': u + "@test.com"};
        
    // Make sure db is clean to avoid errors
    before(function(){
        users.remove(user);
    });

    // Insert user in db before running test
    // it('should register user', function(done){
    before(function(done){
        users.insert(user)
        .success(function(doc){
            expect(doc).to.exist;
            done();
        });
    });

    // create test agent
    var agent1 = request.agent();
    
    // login user with agent before test
    it('should login user', function(done){
    // before(function(done){
        agent1
        .post('localhost:8080/users/login')
        .type('form')
        .send(user)
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Hi ' + u);

            done();
        });
    });
    
    it('should exist and show content', function(done){
        agent1
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Hi ' + u + ', welcome to your dashboard');
            expect(res.text).to.contain('Your Posts');
            expect(res.text).to.contain('Your Drafts');

            
            done();
        });
    });

    describe('Your Posts', function(){
        // Since no posts have been published from this author...
        it('should show no posts from this author', function(done){
            agent1
            .get('localhost:8080/users/dashboard')
            .end(function(err, res){
                expect(err).to.not.exist;

                expect(res.text).to.contain('No posts yet!');

                done();
            });
        });

        // Define new post
        var p = 'new post';
        var newpost = {'title':p, 'body':p};
        

        it('should show a post from this author', function(done){
            

            // Insert new post
            agent1
            .post('localhost:8080/users/newpost')
            .type('form')
            .send(newpost)
            .end(function(err, res){
                expect(err).to.not.exist;
            });

            // Run test
            agent1
            .get('localhost:8080/users/dashboard')
            .end(function(err, res){
                expect(err).to.not.exist;

                expect(res.text).to.not.contain('No posts yet!');
                expect(res.text).to.contain(u);

                done();
            });
        });
        
        after(function(){
            posts.remove(newpost);
        });
    });

    describe('Your Drafts', function(){
        it('should show no drafts from this author', function(done){
            agent1
            .get('localhost:8080/users/dashboard')
            .end(function(err, res){
                expect(err).to.not.exist;

                expect(res.text).to.contain('No drafts saved!');

                done();
            });
        });

        // Define new draft
        var d = 'new draft';
        var newdraft = {'title':d, 'body':d, draft:'on'};

        
        it('should show a draft from this author', function(done){
        
            // Insert new draft
            agent1
            .post('localhost:8080/users/newpost')
            .type('form')
            .send(newdraft)
            .end(function(err, res){
                expect(err).to.not.exist;
            });
            
            
            agent1
            .get('localhost:8080/users/dashboard')
            .end(function(err, res){
                expect(err).to.not.exist;

                expect(res.text).to.not.contain('No drafts saved!');
                expect(res.text).to.contain(d);

                done();
            });
        });
        
        after(function(){
            posts.remove({title: d});
        });

    });

    
    after(function(){
        users.remove(user);
    });
});