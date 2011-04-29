opera.extension.onmessage = function(event) {
    if (event.data == "fetch-urls") {
        var urls = [];
        var elementsWithUrl = {'img':   'src',
                               'embed': 'src',
                               'link':  'href'};
        for (var tag in elementsWithUrl) {
            var tags = document.getElementsByTagName(tag);
            for (var i = 0; i < tags.length; i++) {
                urls.push(tags[i][elementsWithUrl[tag]]);
            }
        }
        opera.extension.postMessage({'type': "urls",
                                     'urls': urls});
    }
}
