/*
 * Copyright (c) 2009 Stefan Penner
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

var Iamstef = Iamstef || {};

Iamstef.referrer = (function(){

  //precompile the REGX to  match url : capture keywords
  var REGEXP     = new RegExp( /^(\w+?):\/\/((?:[\w\-]+\.)+(?:[\w\-]+))\/(?:(?:.+)?[\?&](?:q|p|query|term)=([^&]+)&?)?/i);
  
  // captures [ line,domain,keywords]; 
 
  // extract the keywords
  var keywords = function(url){

    var keywords = '', 
        regx, 
        referrer, [
        uncleaned_keywords,
        matches;

    //untrusted input, if anything goes wrong return '';
    try{

      matches = REGEXP.exec(url);
      
      if(matches.length !== 4) { return ''; }
       
      uncleaned_keywords = matches[3];
      
      keywords = decodeURIComponent(uncleaned_keywords)    
                  .replace(/\++/g,' ')         // remove '+'s
                  .replace(/\s\s+/g,' ')       // collapse consecutive whitespace
                  .replace(/^\s+/,'')          // remove leading whitespace 
                  .replace(/\s+$/,'');         // remove trailing whitespace 
      
      if(keywords === "undefined") { keywords = ''; }

    }catch (err){ keywords = ''; }

    return keywords;
  };

  // extract the hostname
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

  // extract the protocol
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
    }
  };
})();


