window.addEventListener('load',function(){
    var accessor = {consumerKey     : "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
                    consumerSecret  : "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K",
                    // If it's an access token request or a request to
                    // the final web service, add these:
                    // token           : "...",
                    // tokenSecret     : "..."};
                   };
    // Working POST request to get a request/access token
    var message = {method: "post",
                   action: "https://auth.opera.com/service/oauth/request_token",
                   parameters: [
                       ["oauth_callback",  "oob"],
                       // Add this if it's an access token request
                       // ["oauth_verifier", "..."],
                   ]};
    // Working POST request for the Link API
    var message2 = {method: "post",
                    action: "https://link.api.opera.com/rest/speeddial/10/",
                    parameters: [
                        ["api_method", "create"],
                        ["title",      "From JS w00t!"],
                        ["uri",        "http://code.google.com/p/oauth/source/browse/code/javascript/#javascript/example"]]};
    OAuth.completeRequest(message, accessor);
    var requestBody = OAuth.formEncode(message.parameters);
    var requestTokenRequest = new XMLHttpRequest();
    requestTokenRequest.onreadystatechange = function receiveRequestToken() {
        if (requestTokenRequest.readyState == 4) {
            var dump = requestTokenRequest.status+" "+requestTokenRequest.statusText
                  +"\n"+requestTokenRequest.getAllResponseHeaders()
                  +"\n"+requestTokenRequest.responseText;
            window.opera.postError(dump);
        }
    }
    requestTokenRequest.open(message.method, message.action, true);
    requestTokenRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    window.opera.postError(requestBody);
    requestTokenRequest.send(requestBody);
},false);
