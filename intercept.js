// Parse querystring using Prototype.
var url = window.location.href;

var index=url.toString().lastIndexOf("#");

var querystring=url.toString().substring(index+1);
var accesstoken=getQueryVariable("access_token", querystring);
var expires=getQueryVariable("expires_in", querystring);


	// Message passing to background page
	chrome.extension.sendRequest({message: "setToken", accesstoken: accesstoken}, function() 
	{
	  // The data has been sent, we can close the window now.
	  //window.close();
	});


function getQueryVariable(variable, query) 
{
       
        var vars = query.split("&");
	
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
	    
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        alert('Query Variable ' + variable + ' not found');
    }
