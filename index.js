#!/usr/bin/env node

// // const [,, ... args] = process.argv

// const fs = require('fs');
// const path = require('path');
// const myMarked = require('marked');
// // const options = {
// //     validate: program.validate,
// //     stats: program.stats
// // }

// const datos = (path) =>{
//     fs.readFile(path, 'utf-8', (err, data) => {
//     if (err) {

//         console.log('error: ', err);
//     } else {
//         console.log(data);
//     }
// });
// }
// // datos('README.md')
// var renderer = new myMarked.Renderer();
// renderer.heading = function (text, level) {
//     var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

//     return `
//           <h${level}>
//             <a name="${escapedText}" class="anchor" href="#${escapedText}">
//               <span class="header-link"></span>
//             </a>
//             ${text}
//           </h${level}>`;
// };

// // Run marked
// console.log(myMarked('# heading+', { renderer: renderer }));
const fs = require('fs');
const reqpath = require('path');


//Funcion Principal
mdLinks = (path, option) => {

    //Devuelve una promesa
    return new Promise((resolve, reject) => {

        //Obtiene informacion del archivo o los archivos del parametro [path]
        fs.stat(path, (err, stat) => {
            if (err === null) {

                let filelist = [];

                if (stat.isFile()) { //si es archivo

                    let filename = path;

                    filelist.push(filename);

                }
                else if (stat.isDirectory()) { //si es carpeta

                    let diretory = path;

                    fs.readdir(diretory, (err, files) => {

                        if (err) {
                            reject(err);
                        } else {

                            files.filter(filterExtension).forEach((file) => {

                                let filepath = reqpath.resolve(diretory, file);
                                filelist.push(filepath);

                            });

                        }

                    });
                }

                resolve(filelist);

            }
            else {
                reject(err);
            }
        });

    });

};

const getFiles = () => {

}


//Valida si el nombre del archivo tiene extension md
const filterExtension = (filename) => {
    var extName = reqpath.extname(filename);
    return (extName === '.md');
};


module.exports = mdLinks;
