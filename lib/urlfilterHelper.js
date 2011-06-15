/*
 * Obtains the list of url filters from the localStorage cache, if
 * present, or from the Opera Link API, and calls the given callback
 * passing the filters as the only parameter. The accessor token is an
 * object with the properties 'token', 'tokenSecret', 'consumerKey'
 * and 'consumerSecret', where the two first are a valid *access*
 * token.
 */
function getUrlFilters(accessor, callback, errorCallback) {
    var message = {
        action: "https://link.api.opera.com/rest/urlfilter/children",
        method: "GET",
        parameters: {}
    };
    opera.postError("Fetching URLFilters with access token " +
                        accessor.token + ", access token secret " +
                        accessor.tokenSecret);
    OAuth.completeRequest(message, accessor);
    var linkAPIRequest = new XMLHttpRequest();
    linkAPIRequest.onreadystatechange = function receiveRequestToken() {
        if (linkAPIRequest.readyState == 4) {
            if (linkAPIRequest.status == 200) {
                callback(eval(linkAPIRequest.responseText));
            } else if (linkAPIRequest.status == 401) {
                opera.postError("The response status was 401, " +
                                    "removing access token");
                window.localStorage.removeItem("access-token");
                errorCallback();
            } else {
                opera.postError("The response status wasn't 200 or 401, but " +
                                    linkAPIRequest.status +
                                    ", with content: " +
                                    linkAPIRequest.responseText);
            }
        }
    }
    linkAPIRequest.open(message.method, message.action, true);
    var authHeader = OAuth.getAuthorizationHeader("", message.parameters);
    linkAPIRequest.setRequestHeader("Authorization", authHeader);
    linkAPIRequest.send("");
}
