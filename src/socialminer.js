function SocialMiner() 
{
 
	var verbose=true;
   
	var profileArray=new Array();
	
	this.tabUrl;
	
	var that=this;
	
	this.FBAccessToken;
	
	this.getTabUrl=function(callback)
	{
		
		
		chrome.tabs.getSelected(null, function(tab)
		{
			
			
			callback.call(this,tab.url);
			
		});
		
		
		
		
		
		
	}	
	
	this.setTabUrlValue=function(pageUrl)
	{	
		
		that.tabUrl=pageUrl;
		var urlType=that.getUrlType(that.tabUrl);
		
		
	
	}
	
	this.getFBProfileName=function(pageUrl)
	{
		var index=pageUrl.lastIndexOf("/");
		var profileName=pageUrl.substring(index+1);
		console.log("FB Profile is" + profileName);
		return profileName;
	
	
	}
  
	
	this.getUrlType=function(pageUrl)
	{
		this.logToConsole(pageUrl);
		
		//console.log(pageUrl.prototype.toString());
		var fbRegex="(?:http:\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?";
		var soRegex="(?:http:\/\/)?(?:www.)?stackoverflow.com\/(?:(?:\w)*#!\/)?(?:users\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?";
		var lnkdRegex="(?:http:\/\/)?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:in\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?";
		
		if(pageUrl.toString().match(fbRegex))
		{
			this.logToConsole("Its FB Page");
		
			return "fb";
		}
		else if(pageUrl.toString().match(soRegex))
		{
		
			this.logToConsole("Its SO Page");
			return "so";
		
		}
		else if(pageUrl.toString().match(lnkdRegex))
		{
		
			this.logToConsole("Its LNKD Page");
			return "lnkd";
		
		}
	
	
		
	}
	
	this.GetSOProfiles=function(email)
	{
	
	
	
	}
	
	
	this.GetFBProfiles=function(email,type)
	{
		var searchQry="https://graph.facebook.com/search?q=madhur&type="+type+"&access_token=" + this.FBAccessToken;
		
		console.log(this.FBAccessToken);
		
		$.getJSON(searchQry, function(json)
		{
			console.log(json);
			
			$.each(json,function(index,val)
			{
				console.log(key);
				console.log(val);
				var profileId=val[0].id;
				var imgQuery="https://graph.facebook.com/"+profileId+"/picture/";
				
				$("#fb-content").append('<p><img src="https://graph.facebook.com/'+profileId+'/picture"/>');
			});
		});
	
	
	}
	
	this.GetLKPDProfiles=function(email)
	{
	
	
	
	}
	
	
	
	this.logToConsole=function logToConsole(text) 
	{
		if (verbose)
			console.log(text);
	}
      
      
 }
 
 