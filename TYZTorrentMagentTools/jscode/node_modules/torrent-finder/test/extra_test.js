import mocha from 'mocha'
import expect from 'expect.js'
import Extra from '../lib/extra'

describe('Extra', () => {
  var scraper = null

  beforeEach(() => {
    scraper = new Extra()
  })

  describe('#name', () => {
    it('should be extra', () => {
      expect(scraper.name()).to.equal("extra")
    })
  })

  describe('#list', () => {
    it('should fetch page 0', (done) => {
      scraper.list(0, (error, results) => {
        expect(results).to.be.ok()
        expect(results.length > 0).to.be.ok()

        var result = results[0]
        expect(result.size).to.be.ok()
        expect(result.name).to.be.ok()
        expect(result.link).to.be.ok()
        done()
      })
    })
  })

  describe('#search', () => {
    it('should find something', (done) => {
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
