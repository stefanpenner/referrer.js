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
  var REGEXP = new RegExp( /^(\w+?):\/\/((?:[\w\-]+\.)+(?:[\w\-]+))?\/?(?:(?:.+)?[\?&](?:q|p|query|term)=([^&]+)&?)?/i),
      cache  = {},
      undef;

  // extract the keywords
  function keywords(url){

    var result = '', 
        regx, 
        referrer, 
        uncleaned_keywords,
        matches;

    //lookup or parse
    matches = cache[url] = cache[url] || REGEXP.exec(url);
    
    // short circuit if the capture did not yield what we wanted
    if(matches == undef || matches[3] == undef) { return ''; }
       
    uncleaned_keywords = matches[3];
    
    result = decodeURIComponent(uncleaned_keywords).    
                replace(/\++/g,' ').         // remove '+'s
                replace(/\s\s+/g,' ').       // collapse consecutive whitespace
                replace(/^\s+/,'').          // remove leading whitespace 
                replace(/\s+$/,'');          // remove trailing whitespace 
      
    return (result === undef) ? '' : result;
  };

  // extract the hostname
  function hostname(url){
    var matches;
    
    matches = cache[url] = cache[url] || REGEXP.exec(url);

    return (matches == null || matches[2] == null) ? '' : matches[2]
  };

  // extract the protocol
  function protocol(url){
    var matches;
    
    // cache lookup or parse
    matches = cache[url] = cache[url] || REGEXP.exec(url);

    return (matches == null || matches[3] == null) ? '' : matches[1];
  };

  return { 
    version  : "0.0.2",
    
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


