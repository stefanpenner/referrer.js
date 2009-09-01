var Iamstef = Iamstef || {};

Iamstef.referrer = (function(){

  //precompile the REGX to  match url : capture keywords
  var REGEXP     = new RegExp( /^(\w+?):\/\/((?:[\w\-]+\.)+(?:[\w\-]+))\/(?:(?:.+)?[\?&](?:q|p|query|term)=([^&]+)&?)?/i);
  // captures [ line,domain,keywords]; 
 

  // parse a given url
  var keywords = function(url){

    var keywords = '', 
        regx, 
        referrer, 
        uncleaned_keywords;

    //untrusted input, if anything goes wrong return '';
    try{

      var matches = REGEXP.exec(url);
      console.log(matches);
      // matches = [ url,domain,keywords];
      if(matches.length !== 4) { return ''; }
       
      uncleaned_keywords = matches[3];
      
      keywords = decodeURIComponent(uncleaned_keywords)    
                  .replace(/\s+/g,'+')         // remove whitespace 
                  .replace(/\+\++/g,'+')       // collapse consecutive '+'
                  .replace(/[\+\.]+$/,'')      // remove whitespace 
                  .replace(/^\++/,'');         // remove whitespace 
      
      if(keywords === "undefined") { keywords = ''; }

    }catch (err){ keywords = ''; }

    return keywords;
  };

  var hostname = function(url){
    var matches, hostname;
    
    try{
      matches = REGEXP.exec(url);
      
      (matches.length < 3) ?  
        hostname =  '' :
        hostname = matches[2];
    
    }catch (err){ hostname =  '' }

    return hostname;
  };

  
  var protocol = function(url){
    var matches, protocol;
    
    try{
      matches = REGEXP.exec(url);
      
      (matches.length < 2) ?  
        protocol =  '' :
        protocol = matches[1];
    
    }catch (err){ protocol =  '' }

    return protocol;
  };

  return { 
    version  : "0.0.1",
    "protocol" : function(){
      var url = ( arguments[0] !== undefined ) ? arguments[0] : document.referrer;

      return protocol(url);
    },
    "hostname" : function(){
      var url = ( arguments[0] !== undefined ) ? arguments[0] : document.referrer;

      return hostname(url);
    },
    // keywords() will parse the keywords from document.referrer
    // keywords(some_url) will parse the keywords from the given url
    "keywords" : function() { 
      var url = ( arguments[0] !== undefined ) ? arguments[0] : document.referrer;

      return keywords(url);
    }};
})();


