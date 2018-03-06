import mocha from 'mocha'
import expect from 'expect.js'
import Archive from '../lib/archive'

describe('Archive', () => {
  var scraper = null

  beforeEach(() => {
    scraper = new Archive()
  })

  describe('#name', () => {
    it('should be archive', () => {
      expect(scraper.name()).to.equal("archive")
    })
  })

  describe('#list', () => {
    it('should fetch page 1', function(done){
      this.timeout(10000);
      scraper.list(0, (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })

    it('should fetch page 2', function(done){
      this.timeout(10000);
      scraper.list(2, (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })
  })

  describe('#search', () => {
    it('should find something', function(done){
      this.timeout(10000);
      scraper.search('Plan 9 from Outer Space', (error, results) => {
        expect(results).to.be.ok()
        expect(results.length > 0).to.be.ok()

        var result = results[0]
        expect(result.category).to.be.ok()
        expect(result.name).to.be.ok()
        expect(result.name.toLowerCase()).to.match(/outer/)
        expect(result.link).to.be.ok()
        done()
      })
    })

    it('should find something even search is empty', function(done){
      this.timeout(10000);
      scraper.search('', (error, results) => {
        expect(results).to.be.ok()
        expect(results.length > 0).to.be.ok()
        done()
      })
    })
  })
})
