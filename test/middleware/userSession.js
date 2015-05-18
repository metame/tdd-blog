var expect = require('expect.js'),
    userSession = require('../../middleware/userSession'),
    users = require('../../lib/monk').get('users');

// describe('userSession()', function(){
//     // define user for test
//     var u = 'sesstest',
//         user = {username: u, password: u, email: u + '@test.com'};
    
//     // insert test user in db before calling tests
//     before(function(){
//         users.insert(user);
//     });
    
//     it('should be a function', function(done){
//         expect(userSession).to.be.a('function');
//         done();
//     });
    
//     // not sure how to call a middleware function within a test
//     // it('should find a valid user', function(done){
//     //     if(userSession(user)){
//     //         expect(user).to.exist;
//     //     }
        
//     //     done();
//     // });
    
//     // remove test user from db after tests are complete
//     after(function(){
//         users.remove(user);
//     });
// });