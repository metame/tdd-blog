var request = require('superagent'),
    expect = require('expect.js');

// Test structure
describe('Login page', function(){
    it('should exist and show login form',function(done){
        request.get('localhost:8080/login').end(function(err, res){
            if(err) console.error(err);
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('<h1>Login</h1>');
            expect('form').to.exist;
            done();
        });
    });
    
    it('should accept valid login', function(done){
        request
        .post('localhost:8080/login')
        .type('form')
        .send({username: 'test',password: 'test'})
        .end(function(err, res){
            if(err) console.error(err);
            expect(res.text).to.contain('Login successful');
            done();
        });
    });
});


    