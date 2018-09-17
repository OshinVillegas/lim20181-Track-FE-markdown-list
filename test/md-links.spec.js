const mdLinks = require('../index');
const option = {
  validate: false,
  stats: false
}

test('mdLinks(README.md, options)', () => {
  const options = {
    validate: false,
    stats: false
  }
  mdLinks('README.md', options)
    .then(getLinks => {
      expect(linklist).toEqual(
        [ { href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\Oshin Villegas\\Desktop\\Mark\\lim20181-Track-FE-markdown-list\\README.md' },
  { href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\Oshin Villegas\\Desktop\\Mark\\lim20181-Track-FE-markdown-list\\README.md' } ]
      )
    })
})
test('README.md --stast ', () => {
  // jest.setTimeout(12000)

  const options = {
    validate: false,
    stats: true
  }

mdLinks('README.md', options)
    .then( getLinksStats => {
      expect(stats).toEqual({ Total: 2, Unique: 2  })
    })
})
test('mdLinks --validate ', () => {
  const options = {
    validate: true,
    stats: false
  }
  mdLinks('./test', options)
.then(getLinksValidate => {
  expect(validatestats).toEqual([{
    href: 'https://es.wikipedia.org/wikisin/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\Oshin Villegas\\Desktop\\Mark\\lim20181-Track-FE-markdown-list\\README.md',
    status: 'Not Found',
    code: 404 },
  { href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\Oshin Villegas\\Desktop\\Mark\\lim20181-Track-FE-markdown-list\\README.md',
    status: 'OK',
    code: 200
  }  
])
})
})

test('README.md --validate --stats', () => {
  //jest.setTimeout(20000)
  const options = {
    validate: true,
    stats: true
  }
  mdLinks('README.md', options)
    .then(getLinksValidateStats => {
      expect(validatestats).toEqual({total: 2, uniques: 2, broken: 1 } )
    })
})

test('mdLinks(README.md, options)', () => {
  const options = {
    validate: false,
    stats: false
  }
  mdLinks('prueba', options)
    .then(getLinks => {
      expect(linklist).toEqual(
        [ { href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\Oshin Villegas\\Desktop\\Mark\\lim20181-Track-FE-markdown-list\\README.md' },
  { href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\Oshin Villegas\\Desktop\\Mark\\lim20181-Track-FE-markdown-list\\README.md' } ]
      )
    })
})
test('prueba --stast ', () => {
  // jest.setTimeout(12000)

  const options = {
    validate: false,
    stats: true
  }

mdLinks('prueba', options)
    .then( getLinksStats => {
      expect(stats).toEqual({ Total: 2, Unique: 2  })
    })
})
test('prueba --validate --stats deberia retornar la cantidad de link, los links unicos y los rotos', () => {
  //jest.setTimeout(20000)
  const options = {
    validate: true,
    stats: true
  }
  mdLinks('prueba', options)
    .then(getLinksValidateStats => {
      expect(validatestats).toEqual({total: 2, uniques: 2, broken: 1 } )
    })
})
