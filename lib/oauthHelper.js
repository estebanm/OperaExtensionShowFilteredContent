// The base URL for the Auth server
var baseAuthUrl = "https://auth.opera.com/service/oauth";
var accessor = {consumerKey     : "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
                consumerSecret  : "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K"};

/*
 * Parses a typical reply from Auth (text like
 *
 *   oauth_token=RTZzObWm03okO6zup7YAXw353tRd6atl&oauth_token_secret=soDNYh9LDuD4Ru82oAcNRi27tL9J8MPH
 *
 * and returns an object with the properties 'token' and 'tokenSecret',
 * extracted from the text
 */
function parseTokenFromText(text) {
    var token = {};
    var varValPairs = text.split('&');
    for (i = 0; i < varValPairs.length; i++) {
        var varValArray = varValPairs[i].split('=');
        if (varValArray[0] == 'oauth_token') {
            token.token = varValArray[1];
        }
        if (varValArray[0] == 'oauth_token_secret') {
            token.tokenSecret = varValArray[1];
        }
    }
    return token;
}

/*
 * Retrieves a request token from Auth and calls the given callback with it.
 * The request token is an object with the properties 'token',
 * 'tokenSecret', 'consumerKey' and 'consumerSecret'.
 */
function getRequestToken(accessor, callback) {
    var message = {method: "post",
                   action: baseAuthUrl + "/request_token",
                   parameters: [["oauth_callback",  "oob"]]};
    OAuth.completeRequest(message, accessor);
    var requestBody = OAuth.formEncode(message.parameters);
    opera.postError("Trying to get a request token");
    var requestTokenRequest = new XMLHttpRequest();
    requestTokenRequest.onreadystatechange = function receiveRequestToken() {
        if (requestTokenRequest.readyState == 4) {
            var token = parseTokenFromText(requestTokenRequest.responseText);
            token.consumerKey    = accessor.consumerKey;
            token.consumerSecret = accessor.consumerSecret;
            callback(token);
        }
    }
    requestTokenRequest.open(message.method, message.action, true);
    requestTokenRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requestTokenRequest.send(requestBody);
}

/*
 * Retrieves an access token from Auth (using verifier as the verification
 * code for the request) and calls the given callback with it.
 * The request token is an object with the properties 'token',
 * 'tokenSecret', 'consumerKey' and 'consumerSecret'.
 */
function getAccessToken(accessor, verifier, callback) {
    var message = {method: "post",
                   action: baseAuthUrl + "/access_token",
                   parameters: [["oauth_verifier",  verifier]]};
    OAuth.completeRequest(message, accessor);
    var requestBody = OAuth.formEncode(message.parameters);
    var accessTokenRequest = new XMLHttpRequest();
    accessTokenRequest.onreadystatechange = function() {
        if (accessTokenRequest.readyState == 4) {
            var token = parseTokenFromText(accessTokenRequest.responseText);
            token.consumerKey    = accessor.consumerKey;
            token.consumerSecret = accessor.consumerSecret;
            callback(token);
        }
    }
    accessTokenRequest.open(message.method, message.action, true);
    accessTokenRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    accessTokenRequest.send(requestBody);
}
