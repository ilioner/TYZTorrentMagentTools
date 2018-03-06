var kickass = require('../index');

var params = {
  q: 'test',
  field:'seeders',
  order:'desc'
}

describe('kickass', function(){
    it('should contain an array of torrents', function(done) {
        kickass(params, function(err, result) {
            expect(err).toBeNull();
            expect(result.list.length).not.toBe(0);
            result.list.forEach(function(element) {
                expect(element.title).not.toBeNull();
                expect(element.link).not.toBeNull();
                expect(element.guid).not.toBeNull();
                expect(element.pubDate).not.toBeNull();
                expect(element.torrentLink).not.toBeNull();
                expect(element.files).not.toBeNull();
                expect(element.comments).not.toBeNull();
                expect(element.hash).not.toBeNull();
                expect(element.peers).not.toBeNull();
                expect(element.seeds).not.toBeNull();
                expect(element.leechs).not.toBeNull();
                expect(element.size).toBeGreaterThan(0);
                expect(element.votes).not.toBeNull();
                expect(element.verified).not.toBeNull();
            })
            done();
        })
    });

    it('should return an empty list', function(done) {
        params.q = '3d8f7c6e91bbaa6766948ec13320533f';
        kickass(params, function(err, result) {
            expect(err).toBeNull();
            expect(result.list.length).toBe(0);
            done();
        });
    })
});