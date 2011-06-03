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
			console.log(profileName);
			
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
		   
	    
	    
   });

 
   renderContents();

  
});