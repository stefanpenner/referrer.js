var Iamstef = Iamstef || {};

Iamstef.referrer = (function(){

  //precompile the REGX to  match url : capture keywords
  var REGEXP = new RegExp( /^https?:\/\/((?:[\w\-]+\.)+(?:[\w\-]+))\/(?:.+)?[\?&](?:q|p|query|term)=([^&]+)&?/i);
  // captures [ line,domain,keywords]; 
 

  // parse a given url
  var parse = function(url){

    var keywords = '', 
        regx, 
        referrer, 
        uncleaned_keywords;

    //untrusted input, if anything goes wrong return '';
    try{

      var matches = REGEXP.exec(url);
      // matches = [ url,domain,keywords];
      if(matches.length !== 3) { return ''; }
      
      console.log(matches);
      uncleaned_keywords = matches[2];

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


