/*
 * Example of how to get an access token from OAuth from scratch, and make a
 * POST request with that access token.
 * You'd have to:
 * 1) Set requestType to 0, run the code to get the request token
 * 2) Set the obtained (request) token under "case 1", set requestType to 1,
 *    run the code again to get the access token
 * 3) Set the obtained (access) token under "case 2", set requestType to 2, run
 *    the code again to make the final request (adds a Speed Dial in position
 *    10 if it's free; it will give an error otherwise)
 */
window.addEventListener('load',function(){
    var requestType = 0;
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
