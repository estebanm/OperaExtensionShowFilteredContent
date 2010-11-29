window.addEventListener('load',function(){
    var url = "https://link.api.opera.com/rest/speeddial/children";
    var accessor = {
        token: "...",
        tokenSecret: "...",
        consumerKey : "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
        consumerSecret: "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K"
    };
    var message = {
        action: url,
        method: "GET",
        parameters: {}
    };

    OAuth.completeRequest(message, accessor);
    url = url + '?' + OAuth.formEncode(message.parameters);

    window.opera.postError("The URL ends up as " + url);
},false);
