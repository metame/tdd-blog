/* ERROR: Tests fail because terminal won't accept session cookies causing req.session.user to remain undefined */

// var request = require('superagent'),
//     expect = require('expect.js');

// describe('User Dashboard', function(){
    // before(function(){
    //     request
    //     .post('localhost:8080/users/register')
    //     .type('form')
    //     .send({'username': 'dashtest', 'password': 'dashtest', 'email': 'dashtest@test.com'})
    //     .end(function(err, res){
    //         if(err) throw err;
            
    //         request.post('localhost:8080/users/login')
    //         .type('form')
    //         .send({'username': 'dashtest', 'password': 'dashtest'})
    //         .end(function(err, res){
    //             if(err) throw err;
    //         });
    //     });
    // });
//     it('should exist', function(done){
//         request.get('localhost:8080/users/dashboard').end(function(err, res){
//             if(err) throw err;
            
//             expect(res).to.exist;
//             expect(res.status).to.equal(200);
//             expect(res.text).to.contain('Welcome to your Dashboard, dashtest');
//         });
//     });
// });