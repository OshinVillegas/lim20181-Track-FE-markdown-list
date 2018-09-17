const mdLinks = require('./index');
const program = require('commander');


program
    .version('1.0.0')
    .description('Markdown Links by Oshin Villegas')
    .arguments('<path-to-file>')
    .option('-v, --validate', 'HTTP request to find out if the link works or not') //Petición HTTP para averiguar si el link funciona o no
    .option('-s, --stats', 'basic statistics about links') //Estadísticas básicas sobre los links
    .action((path)=> {

      let options = {
        validate: false,
        stats: false
      };  

      options.validate = (program.validate ? true : false);
      options.stats = (program.stats ? true : false);

      mdLinks(path, options)
      .then((links) => {
        //console.log(links);
      })
      .catch((err) => {
        console.log(err.message);
      });

    })
    .parse(process.argv);
