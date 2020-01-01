const rp = require('request-promise');
const $ = require('cheerio');


const gmeParse = function(url) {
  return rp(url)
    .then(function(html) {
      return {
        name: $('.product-title', html).text().replace(/\s\s+/g, ''), 
        mfg: $('.item-num-mfg', html).text().replace(/\s\s+/g, ''),
        specs: $('.pd-specs', html).text().replace(/\s\s+/g, ', '), 
        weight: $('.shipping-weight', html).text().replace(/\s\s+/g, ' \n'),
      };
         })
        .catch(function(err) {
      //handle error
    });
   };
module.exports = gmeParse;

