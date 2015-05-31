var request = require('superagent'),
    expect = require('expect.js'),
    users = require('../../lib/monk').get('users');

// Test structure
describe('Login page', function(){
    it('should exist and show login form',function(done){
        request.get('localhost:8080/users/login').end(function(err, res){
            if(err) console.error(err);
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect('form').to.exist;
            done();
        });
    });
    
    // Define user
    var user = {'username': 'test', 'password': 'test', 'email': 'test@test.com'}
    
    // Make sure db is clean to avoid errors
    before(function(){
        users.remove(user);
    });

    // Insert user in db before running test
    // it('should insert user in db', function(done){
    before(function(done){
        users.insert(user)
        .success(function(doc){
            expect(doc).to.exist;
            done();
        });
    });
    
    it('should accept valid login', function(done){
        var agent = request.agent();
        agent
        .post('localhost:8080/users/login')
        .type('form')
        .send({username: 'test',password: 'test'})
        .end(function(err, res){
            if(err) console.error(err);
            expect(res.text).to.contain('test');
            done();
        });
    });
    
    it('should reject invalid username', function(done){
        request
        .post('localhost:8080/users/login')
        .type('form')
        .send({username: 'fail', password: 'test'})
        .end(function(err, res){
            if(err) console.error(err);
            expect(res.text).to.contain('Username does not exist');
            done();
        });
    });
    
    it('should reject invalid password', function(done){
        request
        .post('localhost:8080/users/login')
        .type('form')
        .send({username: 'test', password: 'fail'})
        .end(function(err, res){
            if(err) console.error(err);
            expect(res.text).to.contain('Password incorrect');
            done();
        });
    });
    
    after(function(){
        users.remove({'username': 'test'});
    });
});


    