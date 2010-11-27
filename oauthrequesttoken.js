window.addEventListener('load',function(){
    var url = "https://auth.opera.com/service/oauth/request_token";
    var accessor = {
        consumerKey : "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
        consumerSecret: "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K"
    };
    var message = {
        action: url,
        method: "POST",
        parameters: {}
    };

    OAuth.completeRequest(message, accessor);
    OAuth.SignatureMethod.sign(message, accessor);
    postData = OAuth.formEncode(message.parameters);

    window.opera.postError("URL = " + url);
    window.opera.postError("POST data = " + postData);
},false);
