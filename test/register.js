var request = require('superagent'),
    expect = require('expect.js');
    
describe('Registration', function(){
    it('should exist and show register form', function(done){
        request.get('localhost:8080/register').end(function(err, res){
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
        .post('localhost:8080/register')
        .type('form')
        .send(newUser)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain("Registration successful");
            
            done();
        });
    });
    
    it('should reject duplicate username on registration', function(done){
        var dupUsername = {'username': 'test3', 'password': 'test3', 'email': 'test3@test.com'};
        dupUsername["email"] = "notdupe@test.com";
        request
        .post('localhost:8080/register')
        .type('form')
        .send(dupUsername)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain("Duplicate username");
            
            done();
        });
    });
    
    it('should reject duplicate email on registration', function(done){
        var dupEmail = {'username': 'test3', 'password': 'test3', 'email': 'test3@test.com'};
        dupEmail["username"] = "notdupe";
        request
        .post('localhost:8080/register')
        .type('form')
        .send(dupEmail)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain("Duplicate email");
            
            done();
        });
    });
    
    it('should allow new user to login', function(done){
        request
        .post('localhost:8080/login')
        .type('form')
        .send(newUser)
        .end(function(err, res){
            if(err) throw err;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain("Login successful");
            
            done();
        });
    });
});