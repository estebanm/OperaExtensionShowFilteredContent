window.addEventListener('load',function(){
    var message = {method: "post",
                   action: "https://auth.opera.com/service/oauth/request_token",
                   parameters: [["oauth_timestamp", "1288018976"],
                                ["oauth_nonce",     "EVbeH7cE5KvVG8Lh8uKYf22hnW94cJ3c"]]};
    var accessor = {consumerKey     : "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
                    consumerSecret  : "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K"};
    var requestBody = OAuth.formEncode(message.parameters);
    OAuth.completeRequest(message, accessor);
    OAuth.SignatureMethod.sign(message, accessor);
    var authorizationHeader = OAuth.getAuthorizationHeader("https://auth.opera.com/service/oauth/",
                                                           message.parameters);
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
    requestTokenRequest.setRequestHeader("Authorization", authorizationHeader);
    requestTokenRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    window.opera.postError(authorizationHeader);
    requestTokenRequest.send(requestBody);
},false);
