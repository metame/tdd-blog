var request = require('superagent'),
    expect = require('expect.js'),
    users = require('../../lib/monk').get('users');

describe('user logout', function(){
    var u = 'outuser',
        user = {'username': u, 'password': u, 'email': u + "@test.com"};

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
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Welcome ' + u);

            done();
        });
    });

    // if username shows in dashboard session set successfully
    it('should show valid user session on /dashboard', function(done){
        agent
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Hi ' + u);

            done();
        });
    });

    it('should logout on /logout', function(done){
        agent
        .get('localhost:8080/users/logout')
        .end(function(err, res){
            expect(err).to.not.exist;

            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(u + ' successfully logged out');

            done();
        });
    });

    // Check dashboard route to ensure user session is broken
    it('/dashboard should error', function(done){
        agent
        .get('localhost:8080/users/dashboard')
        .end(function(err, res){
            expect(err).to.exist;

            expect(res.status).to.equal(500);

            done();
        });
    });

    // Remove user from db after tests
    after(function(){
        users.remove(user);
    });
});