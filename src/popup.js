/*var backgroundPage = chrome.extension.getBackgroundPage();
var mailAccounts = backgroundPage.accounts;
var mailCount = 0;
var mailCache = new Array();
var allMail;
var scrollbar;

var unreadCount = 0;
allMail = new Array();

$.each(mailAccounts, function (i, account) {
   unreadCount += account.getUnreadCount();
});
*/

var miner=new SocialMiner();

function renderContents()
{

	

}

$(document).ready(function () {
   
   var urlType;
   
   $("#tabs" ).tabs();

  

    /*window.fbAsyncInit = function() {
        FB.init({appId: '209204245784872', status: true, cookie: true, xfbml: true});
    };
    (function() {
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.src = "http://connect.facebook.net/en_US/all.js";
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
	

    }());*/
   
  

   miner.getTabUrl(function(pageUrl) 
   {
	    miner.setTabUrlValue(pageUrl);	
	    urlType=miner.getUrlType(miner.tabUrl);
	  
	    
	     var lnkd=$("#lnkd");
		   var fb=$("#fb");
		   var so=$("#so");
			
		   if(urlType=="fb")
		   {
			console.log(urlType);
			$( "#tabs" ).tabs("select", 2);
			
			
			// Get the profile name
			var profileName=miner.getFBProfileName(miner.tabUrl);
			console.log("Profile:"+profileName);
			
		   }
		   else if(urlType=="lnkd")
		   {
			console.log(urlType);
			$( "#tabs" ).tabs("select", 1);
		   }
		   else if(urlType=="so")
		   {
			console.log(urlType);
			$( "#tabs" ).tabs("select", 0);
		   }
		   
	    var accessToken = chrome.extension.getBackgroundPage().getItem("accesstoken");
	    console.log(JSON.parse(accessToken));
	    miner.FBAccessToken=JSON.parse(accessToken);
	  //  console.log(accessToken);
	    miner.GetFBProfiles("madhur","user");
	    
	    
	    
   });

 
   renderContents();

  
});