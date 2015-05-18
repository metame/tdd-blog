var request = require('superagent'),
    expect = require('expect.js'),
    users = require('../../lib/monk').get('users');
    
describe('Authentication', function(){
    // Define test user
    var u = 'authtest',
        user = {'username': u, 'password': u, 'email': u + "@test.com"},
        u1 = 'authtest1',
        user1 = {'username': u1, 'password': u1, 'email': u1 + "@test.com"};
        
    // Insert test user in db before running tests
    before(function(done){
        users.insert(user).success(function(doc){
            done();
        });
    });
    
    // create test agent
    var agent0 = request.agent();

    /* TODO - create test for login page to redirect to dashboard ifAuth */
    
    // if !req.user forward to login page
    it('should return 403 and redirect to login', function(done){
        agent0
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(403);
            expect(res.text).to.contain('Login');

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

    // Define second user agent
    var agent1 = request.agent();

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

    it('should show 2nd user and not 1st on /dashboard', function(done){
        agent1
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.not.contain(u);
            expect(res.text).to.contain(u1);

            done();
        });
    });

    /* TODO not allow user to edit other users posts */
    
    after(function(){
        users.remove(user);
    });
    
});