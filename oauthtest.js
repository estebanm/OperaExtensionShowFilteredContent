window.addEventListener('load',function(){
    var ToolbarUIItemProperties = {
        disabled: false,
        title: "Tell me tell me tell me",
        icon: "icons/button.png",
        popup: {
            href: "popup.html",
            width: 300,
            height: 200,
        },
    }
    theButton = opera.contexts.toolbar.createItem(ToolbarUIItemProperties);
    opera.contexts.toolbar.addItem(theButton);


    var popup;
    opera.extension.onconnect = function(event) {
        if (event.origin.indexOf("popup.html") > -1 &&
                event.origin.indexOf("widget://") > -1) {
            if (!popup) {
                popup = event.source;
            }
            var tab = opera.extension.tabs.getFocused();
            if (tab) {
                tab.postMessage("gief-urls");
            }
        }
    }

    opera.extension.addEventListener('message', function(event) {
        if (event.data.urls) {
            if (event.ports.length > 0) {
                if (popup) {
                    popup.postMessage(event.data.urls);
                    popup = undefined;
                }
            }
        }
    }, false);


    return;



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
