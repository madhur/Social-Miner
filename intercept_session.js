var params = window.location.search.toQueryParams();
console.log(params);
if(!params.session) return;
var session = JSON.parse(params.session);
console.log(session);
chrome.extension.sendRequest({message: "setSession", session: session}, function() {
window.close();
});