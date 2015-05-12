var request = require('superagent'),
    expect = require('expect.js'),
    users = require('../../lib/monk').get('users');

describe('User Dashboard', function(){
    // Define user and agent for test
    var u = 'dashtest',
        user = {'username': u, 'password': u, 'email': u + "@test.com"};
        
        
    // Insert user in db before running test
    before(function(done){
        users.insert(user).success(function(doc){
            done();
        });
    });

    // create test agent
    var agent1 = request.agent();
    
    // login user with agent before test
    before(function(done){
        agent1
        .post('localhost:8080/users/login')
        .type('form')
        .send(user)
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Welcome ' + u);

            done();
        });
    });
    
    it('should exist', function(done){
        agent1
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Hi ' + u + ', welcome to your dashboard');
            
            done();
        });
    });
    
    after(function(){
        users.remove(user);
    });
});