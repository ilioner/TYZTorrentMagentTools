import mocha from 'mocha'
import expect from 'expect.js'
import pb from '../lib/piratebay'

describe('PirateBay', () => {
  var scraper = null

  beforeEach(() => {
    scraper = new pb()
  })

  describe('#name', () => {
    it('should be piratebay', () => {
      expect(scraper.name()).to.equal("piratebay")
    })
  })

  describe('#list', () => {
    it('should fetch page 0', function(done){
      this.timeout(10000);
      scraper.list(0, (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })

    it('should fetch page 1', function(done){
      this.timeout(10000);
      scraper.list(1, (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })
  })

  describe('#search', () => {
    it('should search find something', function(done){
      this.timeout(10000);
      scraper.search('Arslan Senki', (error, results) => {
        expect(results).to.be.ok()
        expect(results.length > 0).to.be.ok()

        var result = results[0]
        expect(result.category).to.be.ok()
        expect(result.size).to.be.ok()
        expect(result.name).to.be.ok()
        expect(result.name).to.match(/Arslan/)
        expect(result.link).to.be.ok()
        done()
      })
    })
  })
})
