window.addEventListener('load',function(){
    var requestType = 2;
    var accessor = {consumerKey     : "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
                    consumerSecret  : "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K"};
    var message = {method: "post"};
    switch (requestType) {
    case 0:
        message.action = "https://auth.opera.com/service/oauth/request_token";
        message.parameters = [["oauth_callback",  "oob"]];
        break;
    case 1:
        accessor.token  = "...";
        accessor.tokenSecret = "...";
        message.action = "https://auth.opera.com/service/oauth/access_token";
        message.parameters = [["oauth_verifier",  "..."]];
        break;
    case 2:
        accessor.token  = "...";
        accessor.tokenSecret = "...";
        message.action = "https://link.api.opera.com/rest/speeddial/10/";
        message.parameters = [["api_method", "create"],
                              ["title",      "From JS w00t!"],
                              ["uri",        "http://code.google.com/p/oauth/source/browse/code/javascript/#javascript/example"]];
    }

    OAuth.completeRequest(message, accessor);
    var requestBody = OAuth.formEncode(message.parameters);
    var requestObject = new XMLHttpRequest();
    requestObject.onreadystatechange = function() {
        if (requestObject.readyState == 4) {
            var dump = requestObject.status+" "+requestObject.statusText
                  +"\n"+requestObject.getAllResponseHeaders()
                  +"\n"+requestObject.responseText;
            opera.postError(dump);
        }
    };
    opera.postError("Sending message");
    requestObject.open(message.method, message.action, true);
    requestObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    window.opera.postError(requestBody);
    requestObject.send(requestBody);
},false);
