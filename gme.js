  const rp = require('request-promise');
  const $ = require('cheerio');
  const gmeParse = require('./gmeParse');
  const fs = require('fs');
  const fastcsv = require('fast-csv');  

  // VARIABLES 
  const URLNum = 108;
  const url = '#';
  const ws = fs.createWriteStream("##.csv");
  //MAIN 
  rp(url)
    .then(function(html) {
      const asUrls = [];
      for (let i = 0; i < {URLNum}; i++) {
        asUrls.push($('.item-name > a', html)[i].attribs.href);
      }
      return Promise.all(
        asUrls.map(function(url) {
          return gmeParse('#' + url);   
        }) ,
    )
    .then(function(parts) {
      fastcsv  
        .write(parts, { ignoreEmpty: true })
        .pipe(ws);
        
          console.log("Mission Complete...");
    })
    .catch(function(err) {
      console.log(err);
    });
  })
  