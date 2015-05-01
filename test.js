var request = require('superagent');
var expect = require('expect.js');

// Test structure
describe('Suite one', function(){
    it("should get a response that contains World",function(done){
        request.get('localhost:8080').end(function(err, res){
            if(err) console.error(err);
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain('World');
            done();
        });
    });
});
