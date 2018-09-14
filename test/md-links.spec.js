const mdLinks = require('../index')

const options = {
  validate: undefined,
  stats: undefined
};

test('deberia ser array de objetos', () => {
  // jest.setTimeout(12000)

  return mdLinks('./test', options)
    .then(getLinks => {
      expect(getLinks).toEqual([{
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file:
          'C:\\Users\\Oshin\\Desktop\\lim20181-Track-FE-markdown-list\\README.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file:
          'C:\\Users\\Oshin\\Desktop\\lim20181-Track-FE-markdown-list\\README.md'
      }])
    })
})
