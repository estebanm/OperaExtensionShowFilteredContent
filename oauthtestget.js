window.addEventListener('load',function(){
    var url = "https://link.api.opera.com/rest/speeddial/children";
    var accessor = {
        token: "...",
        tokenSecret: "...",
        consumerKey : "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
        consumerSecret: "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K"
    };
    var message = {
        method: "GET",
        action: url,
        parameters: {}
    };

    OAuth.completeRequest(message, accessor);
    var requestObject = new XMLHttpRequest();
    requestObject.onreadystatechange = function() {
        if (requestObject.readyState == 4) {
            var dump = requestObject.status+" "+requestObject.statusText
                  +"\n"+requestObject.getAllResponseHeaders()
                  +"\n"+requestObject.responseText;
            opera.postError(dump);
        }
    };
    requestObject.open(message.method, message.action, true);
    var authHeader = OAuth.getAuthorizationHeader("", message.parameters);
    opera.postError("Authorization: " + authHeader);
    requestObject.setRequestHeader("Authorization", authHeader);
    requestObject.send("");
},false);
