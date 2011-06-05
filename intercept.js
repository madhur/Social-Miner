// Parse querystring using Prototype.
var url = window.location.href;
//console.log(url.toString());
var index=url.toString().lastIndexOf("#");
//console.log(index);
var querystring=url.toString().substring(index+1);
var accesstoken=getQueryVariable("access_token", querystring);
var expires=getQueryVariable("expires_in", querystring);




//console.log(accesstoken);
//console.log(expires);
// If there's no session data here, we're not terribly interested.

// If there's no session data here, we're not terribly interested.


	
	chrome.extension.sendRequest({message: "setToken", accesstoken: accesstoken}, function() {
	  // The data has been sent, we can close the window now.
	  //window.close();
	});


function getQueryVariable(variable, query) {
       
        var vars = query.split("&");
	//console.log(vars[0]);
	//console.log(vars[1]);
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
	    //console.log(pair[0]);
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        alert('Query Variable ' + variable + ' not found');
    }