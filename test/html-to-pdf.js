var pdf = require('html-pdf')
const fs = require('fs')
const { assert } = require('chai')
const pdfFiller = require('pdffiller')
const htmlString = fs.readFileSync('./samplePDF/test.html', 'utf8')
const mustache = require('mustache')

describe('HTMLToPDFWithPrepopulateWithHeaderAndFooter', () => {
  let start = Date.now()
  it('Should not throw any error', () => {
      let listOfItems = []
    for (let i = 0; i < 5000; i++) {
        listOfItems.push((Math.random() * 10000) + '-Random-Item-then-again-this-is-just-to-occupy-white-spaces-blahblahblah')
    }

    let data = {
      name: 'hellodfddr',
      lastname: 'worldx', 
      listOfItems: listOfItems
    }

    let rendered = mustache.render(htmlString, data)
    const options = {
      format: 'Letter',
      height: '1.0in',
      header: {
        height: '28mm',
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span> Blah HEAD!!!!!!'
        }
      },
      footer: {
        height: '28mm',
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span> Blah FOOT!!!!!!'
        }
      }
    }
    pdf
      .create(rendered, options)
      .toFile('./samplePDF/output/test.pdf', (err, result) => {
        if (err) return console.log(err)
        console.log(result)
        console.log('end', `${Date.now() - start} ms`)
      })
  })
})
