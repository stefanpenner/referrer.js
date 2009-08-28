var Iamstef = Iamstef || {};

Iamstef.referrer = (function(){

    //inernal match url : capture keywords
    // might beable to replace all of this with the single regex match/capture  new RegExp(/[\?&](?:q|p|query|term)=([^&]+)&?/i)

  var RGX = { "google"    : { "matcher" : new RegExp(/^http:\/\/(:?(:?www|blogsearch|ipv6)\.)?google\./i),  "capture" : new RegExp(/[\?&]q=([^&]+)&?/i)},
              "bing"      : { "matcher" : new RegExp(/^http:\/\/(:?www)?\.?bing\./i),                       "capture" : new RegExp(/[\?&]q=([^&]+)&?/i)},
              "seznam"    : { "matcher" : new RegExp(/^http:\/\/(:?[\w\-]+\.)?seznam\./i),                  "capture" : new RegExp(/[\?&]q=([^&]+)&?/i)},
              "pagina"    : { "matcher" : new RegExp(/^http:\/\/(:?[\w\-]+\.)?startpagina\./),              "capture" : new RegExp(/[\?&]q=([^&]+)&?/i)},
              "alltheweb" : { "matcher" : new RegExp(/^http:\/\/(:?www\.)?alltheweb\./i),                   "capture" : new RegExp(/[\?&]q=([^&]+)&?/i)},
              "lycos"     : { "matcher" : new RegExp(/^http:\/\/search\.lycos\./i),                         "capture" : new RegExp(/[\?&](?:query|q)=([^&]+)&?/i)},
              "yahoo"     : { "matcher" : new RegExp(/^http:\/\/(?:[\w\-]+\.)+?yahoo\./i),                  "capture" : new RegExp(/[\?&]p=([^&]+)&?/i)},
              "aol"       : { "matcher" : new RegExp(/^http:\/\/(?:[\w\-]+\.)+?aol(svc)?\./i),              "capture" : new RegExp(/[\?&](?:query|q)=([^&]+)&?/i)},
              "sky"       : { "matcher" : new RegExp(/^http:\/\/(?:[\w\-]+\.)+?sky\./i),                    "capture" : new RegExp(/[\?&]term=([^&]+)&?/i)}};

  // parse a given url
  var parse = function(url){

    var keywords = '',
        regx,
        referrer, 
        uncleaned_keywords;

    //untrusted input, if anything goes wrong return '';
    try{

      // match and grab the correct regx
      for( referrer in RGX){
        //has own property stuff
        if(RGX.hasOwnProperty(referrer)){
          if(url.match(RGX[referrer].matcher) !== null) { 
            regx = RGX[referrer].capture;
            break;
          }
        }
      }

      // short circuit if no suitable regx where found.
      if(regx === undefined ) { return ''; }

      uncleaned_keywords = regx.exec(url)[1];

      keywords = decodeURIComponent(uncleaned_keywords)    
                  .replace(/\s+/g,'+')         // remove whitespace 
                  .replace(/\+\++/g,'+')       // collapse consecutive '+'
                  .replace(/[\+\.]+$/,'')      // remove whitespace 
                  .replace(/^\++/,'');         // remove whitespace 

    }catch (err){ keywords = ''; }

    return keywords;
  };

  return { 
    version  : "0.0.1",
             
    // keywords() will parse the keywords from document.referrer
    // keywords(some_url) will parse the keywords from the given url
    keywords : function() { 
      
      return ( arguments[0] !== undefined ) ? parse(arguments[0]) : parse(document.referrer); 
    }};
})();

