opera.extension.onmessage = function(event) {
    if (event.data == "fetch-urls") {
        var imgs = document.getElementsByTagName('img');
        var img_urls = [];
        for (var i = 0; i < imgs.length; i++) {
            img_urls.push(imgs[i].src);
        }
        opera.extension.postMessage({'type': "urls",
                                     'urls': img_urls});
    }
}
