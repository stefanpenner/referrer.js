    $(function(){
      var invalid_referrers = ["/blog/?p=164",
                               "__JC_UNKNOWN_VAR_cloak.daily-2009-08-09-62-00.vars.referer__",
                               "file:///D:/Belgelerim/My%20Virtual%20Machines/microsoft-iis-60-webdav-remote-authentication-bypass-vulnerability.htm",
                               "http://10.0.17.27/?_task=mail&_action=preview&_uid=1269&_mbox=INBOX&_framed=1",
                               "http://127.0.0.1:4664/preview?event_id=122073&schema_id=2&q=double+email&s=000000000000000000000000000",
                               ];
      var valid_referrers = {
        "http://www.google.at/search?hl=de&client=firefox-a&rls=org.mozilla%3Aen-US%3Aofficial&hs=E36&q=nmap+NT_STATUS_OBJECT_NAME_NOT_FOUND&btnG=Suche&meta=" : "nmap+NT_STATUS_OBJECT_NAME_NOT_FOUND",
        "http://www.google.ca/search?q=stefan+penner&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a"                                   : "stefan+penner",
        "http://www.bing.com/search?q=stefan+penner&go=&form=QBLH&filt=all&qs=n"                                                                               : "stefan+penner",
        "http://www.google.ca/search?q=++stefan+++penner++&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a"                             : "stefan+penner",
        "http://search.seznam.cz/?q=some+keywords&mod=f"                                                                                                       : "some+keywords",
        "http://www.google.nl/custom?sa=Zoeken&client=pub-7366832505664613&forid=1&ie=ISO-8859-1&oe=ISO-8859-1&cof=GALT%3A%23008000%3BGL%3A1%3BDIV%3A%23336699%3BVLC%3A663399%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3A336699%3BALC%3A0000FF%3BLC%3A0000FF%3BT%3A000000%3BGFNT%3A0000FF%3BGIMP%3A0000FF%3BFORID%3A1%3B&hl=nl&q=random%20keywords"                                         : "random+keywords",
        "http://www.alltheweb.com/search?cat=web&cs=iso88591&q=more+random+keywords&rys=0&itag=crv&_sb_lang=pref"                                              : "more+random+keywords",
        "http://search.lycos.com/?query=search+lycos&x=0&y=0&diktfc=8F6B14F21F968795CB226449711AEB0147FB12BC5DF0"                                              : "search+lycos",
        "http://ca.search.yahoo.com/search;_ylt=A0oG75k5K5NKFtcACXLrFAx.?p=lets+search+google&y=Search&fr=yfp-t-501&fr2=sb-top&rd=r1&sao=1"                    : "lets+search+google",
        "http://search.aol.ca/aol/search?invocationType=&query=lets+search+google&do=Search"                                                                   : "lets+search+google",
        "http://search1.sky.com/web?term=lets+search+google"                                                                                                   : "lets+search+google"
                               };

      //fire unit integration
      if ( typeof fireunit === "object" ) {
        QUnit.log = fireunit.ok;
        QUnit.done = fireunit.testDone;
      }

      test("valid referrer with leading and sequences of '+'", function() {
        var value = Iamstef.referrer.keywords("http://www.google.ca/search?q=++stefan+++penner++&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a");
        equals( value, "stefan+penner", "We expect value to be cleaned to stefan+penner" );
      });


      test("invalid referrers", function() {
          for(var i = 0; i < invalid_referrers.length;i++){                        
            var value = Iamstef.referrer.keywords(invalid_referrers[i]);
            equals( value, "", "We expect no keywords" );
          }
      });

      test("valid referrers", function() {
          for(var referrer in valid_referrers){
            if(valid_referrers.hasOwnProperty(referrer)){
              var value    = Iamstef.referrer.keywords(referrer);
              var keywords = valid_referrers[referrer];
              equals( value, keywords, "We expect the keywords '" + keywords + "'"  );
            }
          }
      });
    });

