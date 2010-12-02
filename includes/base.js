opera.extension.onmessage = function(event) {
    if (event.data == "gief-urls") {
        var imgs = document.getElementsByTagName('img');
        var img_urls = [];
        for (var i = 0; i < imgs.length; i++) {
            img_urls.push(imgs[i].src);
        }
        var background = event.source;
        var channel = new MessageChannel();
        background.postMessage({'type': event.type,
                                'urls': img_urls},
                               [channel.port2]);
    }
}
