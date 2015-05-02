var request = require('superagent'),
    expect = require('expect.js');
    
describe('Registration', function(){
    it('should exist and show register form', function(done){
        request.get('localhost:8080/register').end(function(err, res){
            if(err) console.error(err);
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('Register');
            expect('form').to.exist;
            
            done();
        });
    });
    
    it('should accept valid registration information', function(done){
        request
        .post('localhost:8080/register')
        .type('form')
        .send({'username': 'test3', 'password': 'test3', 'email': 'test3@test.com'})
        .end(function(err, res){
            if(err) console.error(err);
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain("Registration successful!");
            
            done();
        });
    });
});