var request = require('superagent'),
    expect = require('expect.js'),
    genPermalink = require('../../middleware/genPermalink');

// Need to view how to unit test express middleware
describe('genPermalink()', function(){
    it('should be a function', function(){
        expect(genPermalink).to.be.a('function');
    });
});