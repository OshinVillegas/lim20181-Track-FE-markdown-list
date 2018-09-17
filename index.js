const fs = require('fs');
const marked  = require('marked');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const pathNode = require('path')

const mdLinks = (path, option) => {

  return new Promise((resolve, reject) => {

    try {

      //Lista de archivos md
      let filelist = [];
    
      //Obtener datos de la ruta (archivo o carpeta)
      let stat = fs.statSync(path);
      if (stat.isFile()) { //si es archivo
        if (filterExtension(path)){ //si es archivo con extension md
          let filename = pathNode.resolve(__dirname, path); //Requerir path y usarlo para
          filelist.push(filename);
        }
      }
      else if (stat.isDirectory()) { //si es carpeta
        let diretory = path;
        filelist = filesDirectory(diretory);
      }


      //Repuesta segun opcion ingresada


      filelist.forEach(file => {
        if (option === null || (option.validate === false && option.stats === false)){
          let links = getLinks(file);
          console.log(links)
          resolve(getLinks);

        } else if (option.validate === true && option.stats === false) {
          getLinksValidate(file).then((linksvalidate) => {
            console.log( linksvalidate);
            resolve(linksvalidate);
          });
        } else if (option.validate === false && option.stats === true) {
          let linksstats = getLinksStats(file);
          console.log(linksstats)
          resolve(linksstats);
        } else if (option.validate === true && option.stats === true) {
          getLinksValidate(file).then(link => {
            //console.log(link)
            console.log({
              total : link.length,
              uniques :unique(link).length,
              broken : broken(link).length
            })
          })
          //console.log(linksvalidatestats)
          //broken()
          //console.log(linksvalidatestats)
          //resolve(linksvalidatestats);
        }
      });
    }
    catch(err) {

      reject(err);

    }

  });

};

const filterExtension = (filename) =>{
  var extName = pathNode.extname(filename);
  return (extName === '.md'); 
};

const filesDirectory = (diretory) => {
  try {
    let filelist = [];

    let files = fs.readdirSync(diretory);

    files.filter(filterExtension).forEach((file) => {
        
      let filepath = pathNode.resolve(diretory, file);
      filelist.push(filepath);

    });

    return filelist;
  }
  catch(err) {
    throw err;
  }
}

//Funcion para obtener los link del archivo MD
const getLinks = (filename) => {
  try {
    let linklist = [];

    let linkobj = { 
      href: '',
      text: '',
      file: filename
    }

    //Abrir archivo MD con UTF8 para soportar caracteres especiales
    let data = fs.readFileSync(filename,'utf8');

    //Convertir data en HTML
    let html = marked(data);

    //
    $ = cheerio.load(html);
    links = $('a');
    $(links).each(function(i, link){
      linkobj.href = $(link).attr('href'); //Obtener la url del link
      linkobj.text = $(link).text(); //Obtener el texto del link

      linklist.push(linkobj);
    });
    
    return linklist;
  } catch (err) {
    throw err;
  }
}

const getLinksValidate = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      //Leer archivo MD
      let data = fs.readFileSync(filename, 'utf8');

      //Convertir a Html
      let html = marked(data);

      //Obtener solo links
      $ = cheerio.load(html);
      links = $('a');
      const promesas = []
      $(links).each(function (i, link) {
        let linkobj = {
          href: '',
          text: '',
          file: filename,
          status: '',
          code: ''
        }

        linkobj.href = $(link).attr('href');
        linkobj.text = $(link).text();

        //Validar si la url es valida o no
        
        promesas.push(new Promise((resolveInner, rejectInner) => {
          fetch(linkobj.href).then((response) => {
            linkobj.status = response.statusText;
            linkobj.code = response.status;
            resolveInner(linkobj)
          })
        }))
      });
      Promise.all(promesas).then(resolve)
    } catch (err) {
      reject(err);
    }
  })
}

//Funcion que devuelve el resumen del archivo
const getLinksStats = (filename) => {
  try {

    let stats = { 
      Total: 0,
      Unique : 0
    }

    //Abrir data del archivo MD
    let data = fs.readFileSync(filename,'utf8');

    //Convertir MD a HTML
    let html = marked(data);

    let listhref = [];

    $ = cheerio.load(html);
    links = $('a');
    $(links).each(function(i, link){
      let href = $(link).attr('href');
      listhref.push(href);
    });

    stats.Total = listhref.length;
    stats.Unique = unique(listhref).length;
    
    return stats;
  } catch (err) {
    throw err;
  }
}

const unique = (listhref) => {
  return listhref.filter((href, i, listhref) => {
    return i == listhref.indexOf(href);
  });
}

function broken (listhref)  {
  console.log(listhref)
  return listhref.filter((href) => {
     if(href.code === 404){
       return href
     }
   /*  return fetch(href)
    .then(response => response.status === 404); */
  });
}

const getLinksValidateStats = (filename) => {
  try {
    let validatestats = { 
      Total: 0,
      Unique: 0,
      Broken: 0
    }

    // let data = fs.readFileSync(filename,'utf8');
    // let html = marked(data);

    // let listhref = [];

    // $ = cheerio.load(html);
    // links = $('a');
    // $(links).each(function(i, link){
    //   let href = $(link).attr('href');
    //   listhref.push(href);
    // });
    return validatestats
  } 
  catch(err){}
}


module.exports = mdLinks;