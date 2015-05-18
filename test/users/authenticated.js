var request = require('superagent'),
    expect = require('expect.js'),
    users = require('../../lib/monk').get('users'),
    posts = require('../../lib/monk').get('posts');
    
describe('Authentication', function(){
    // Define test user
    var u = 'authtest',
        user = {'username': u, 'password': u, 'email': u + "@test.com"},
        u1 = 'authtest1',
        user1 = {'username': u1, 'password': u1, 'email': u1 + "@test.com"};
        
    // Insert test users in db before running tests
    before(function(done){
        users.insert(user).success(function(doc){
            done();
        });
    });

    before(function(done){
        users.insert(user1).success(function(doc){
            done();
        });
    });
    
    // create test agent
    var agent0 = request.agent();
    
    // if !req.user return 403
    it('get /dashboard should return 403 before login', function(done){
        agent0
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(403);

            done();
        });
    });

    // define new post
    var p = {"title":"auth post","body":"auth post body"};

    it('post /newpost should return 403 before login', function(done){
        agent0
        .post('localhost:8080/users/newpost')
        .type('form')
        .send(p)
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(403);

            done();
        });
    });

    // login user with agent before test
    it('should login user successfully', function(done){
        agent0
        .post('localhost:8080/users/login')
        .type('form')
        .send(user)
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);

            done();
        });
    });
    
    it('should show user on /dashboard after successful auth', function(done){
        agent0
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(u);

            done();
        });
    });

    it('should not show login page when already logged in', function(done){
        agent0
        .get('localhost:8080/users/login')
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.text).to.not.contain('Login');

            done();
        });
    });

    it('should submit new post successfully', function(done){
        agent0
        .post('localhost:8080/users/newpost')
        .type('form')
        .send(p)
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(p.title);

            done();
        });
    });

    // Define second user agent
    var agent1 = request.agent();

    it('should not let new agent take session', function(done){
        agent1
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(403);
            expect(res.text).to.not.contain(u);

            done();
        });
    });

    it('should successfully login 2nd user', function(done){
        agent1
        .post('localhost:8080/users/login')
        .type('form')
        .send(user1)
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);

            done();
        });
    });

    it('should show 2nd user on /dashboard', function(done){
        agent1
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(u1);

            done();
        });
    });

    it('should not allow a user to edit other user posts', function(done){
        agent1
        .get('localhost:8080/users/edit/AuthPost')
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(403);

            done();
        });
    });
    
    after(function(){
        users.remove(user);
        users.remove(user1);
        posts.remove(p);
    });
    
});