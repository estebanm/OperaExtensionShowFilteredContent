var UrlFilter = function(urlfilterlist) { this.init(urlfilterlist) };
(function()
 {
     this._urlfilterlist = [];
     this.init = function(urlfilterlist) {
         this._urlfilterlist = urlfilterlist;
     }

     this.isUrlBlacklisted = function(url) {
         for (var i = 0; i < this._urlfilterlist.length; i++) {
             var urlfilter = this._urlfilterlist[i];
             if (urlfilter.type == 'exclude') {
                 var regex = new RegExp('^' +
                                       urlfilter.content.replace(/\*/, '.*') +
                                       '$');
                 if (regex.test(url))
                     return true;
             }
         }
         return false;
     }

     this.getBlacklistedUrls = function(urls) {
         var r = [];
         for (var i = 0; i < urls.length; i++) {
             if (this.isUrlBlacklisted(urls[i])) {
                 r.push(urls[i]);
             }
         }
         return r;
     }
 }).call(UrlFilter.prototype);
