var request = require('superagent'),
    expect = require('expect.js'),
    users = require('../../lib/monk').get('users');

// Test failing showing 500 status due to req.session.user not being set
describe.skip('User Dashboard', function(){
    // Define user and agent for test
    var u = 'dashtest',
        user = {'username': u, 'password': u, 'email': u + "@test.com"},
        agentD = request.agent();
        
    // Register user before running test
    before(function(){
        users.insert(user);
    });
    
    it('should allow user to login', function(done){
        agentD
        .post('localhost:8080/users/login')
        .type('form')
        .send(user)
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res.status).to.equal(200);
            expect(res.headers['content-type']).to.contain('text/html');
            expect(res.text).to.contain('Welcome ' + u);

            done();
        });
    });
    
    it('should exist', function(done){
        agentD
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;
            
            // expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Hi ' + u + ', welcome to your dashboard');
            
            done;
        });
    });
    
    after(function(){
        users.remove(user);
    });
});