var request = require('superagent'),
    expect = require('expect.js'),
    users = require('../../lib/monk').get('users');
    
describe('Registration', function(){
    it('should exist and show register form', function(done){
        request.get('localhost:8080/users/register').end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Register');
            expect('form').to.exist;
            
            done();
        });
    });
    
    var newUser = {'username': 'test3', 'password': 'test3', 'email': 'test3@test.com'};
    
    it('should accept valid registration information', function(done){
        request
        .post('localhost:8080/users/register')
        .type('form')
        .send(newUser)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('You registered successfully with username ' + newUser.username + ' and email ' + newUser.email);
            
            done();
        });
    });

    it('should show new user in database', function(done){
        users.findOne({'username':'test3'}).on('complete', function(err, doc){
            if(err) throw err;

            expect(doc).to.exist;
            expect(doc.username).to.equal(newUser.username);
            expect(doc.password).to.equal(newUser.password);
            expect(doc.email).to.equal(newUser.email);

            done();
        });
    });
    
    it('should reject duplicate username on registration', function(done){
        var dupUsername = {'username': 'test3', 'password': 'test3', 'email': 'test3@test.com'};
        dupUsername['email'] = 'notdupe@test.com';
        request
        .post('localhost:8080/users/register')
        .type('form')
        .send(dupUsername)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(dupUsername.username + ' already registered');
            
            done();
        });
    });
    
    it('should reject duplicate email on registration', function(done){
        var dupEmail = {'username': 'test3', 'password': 'test3', 'email': 'test3@test.com'};
        dupEmail['username'] = 'notdupe';
        request
        .post('localhost:8080/users/register')
        .type('form')
        .send(dupEmail)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(dupEmail.email + ' already registered');
            
            done();
        });
    });
    
    it('should allow new user to login', function(done){
        var agent = request.agent();
        agent
        .post('localhost:8080/users/login')
        .type('form')
        .send(newUser)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Hi ' + newUser.username);
            
            done();
        });
    });
    
    after(function(){
        users.remove(newUser);
    });
});