describe("UrlFilter", function() {
  it("shouldn't blacklist any URLs when there aren't any filters", function() {
    var urlfilter = new UrlFilter([]);
    var urls = ["http://foo.com", "http://bar.com"];
    var r = urlfilter.getBlacklistedUrls(urls);
    expect(r).toEqual([]);
  });

  it("should blacklist all URLs when there is an exclude wildcard", function() {
    var urlfilter = new UrlFilter([{'properties': {'content': '*', 'type': 'exclude'}}]);
    var urls = ["http://foo.com", "http://bar.com"];
    var r = urlfilter.getBlacklistedUrls(urls);
    expect(r).toEqual(urls);
  });

  it("should not blacklist URLs that don't have a matching exclude wildcard", function() {
    var urlfilter = new UrlFilter([{'properties': {'content': '*.com', 'type': 'exclude'}}]);
    var urls = ["http://foo.com", "http://bar.com", "http://qux.org"];
    var r = urlfilter.getBlacklistedUrls(urls);
    expect(r).toEqual(["http://foo.com", "http://bar.com"]);
  });

  it("should not consider partial matches valid", function() {
    var urlfilter = new UrlFilter([{'properties': {'content': 'http://*.com',
                                                   'type':    'exclude'}}]);
    var urls = ["http://foo.com/dontblockmeplease", "http://bar.com"];
    var r = urlfilter.getBlacklistedUrls(urls);
    expect(r).toEqual([urls[1]]);
  });

  it("should not match subdirectories", function() {
    var urlfilter = new UrlFilter([{'properties':
                                    {'content': 'http://admonger.com/ads/*',
                                     'type':    'exclude'}}]);
    var urls = ["http://admonger.com/ads/1/2/3/ad.png", "http://admonger.com"];
    var r = urlfilter.getBlacklistedUrls(urls);
    expect(r).toEqual([urls[0]]);
  });
});
