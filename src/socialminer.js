function SocialMiner() 
{
 
	var verbose=true;
   
	var profileArray=new Array();
	
	this.tabUrl;
	
	var that=this;
	
	this.FBAccessToken;
	
	var profileArray=new Array();
	
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
			
		var re = /(?:http:\/\/)?(?:www.)?facebook\.com\/(?:profile\.php\?id=(?=\d.*))?([\w\-\.]*)?/;
		var m = re.exec(pageUrl);
		if (m == null) 
		{
			alert("No match");
		} 
		else 
		{
			var s = "Match at position " + m.index + ":\n";
			for (i = 0; i < m.length; i++) 
			{
				s = s + m[i] + "\n";
			}
			
		}
		return m[1];
	
	
	}
	
	this.getSearchQueryTerm=function(pageUrl)
	{
		var googRegex1=new RegExp("(?:http://www\\.google\\.(?:com?\\.)?[a-z]{2,3}/(?:search)?.*?&q=\\+*([^&\"\\r\\n]+)[^\"\\r\\n]*)");
		var m=googRegex1.exec(pageUrl);
		return m[1];
	
	
	
	
	
	}
  
	
	this.getUrlType=function(pageUrl)
	{
		this.logToConsole(pageUrl);
		
		
		var fbRegex="(?:http:\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?";
		var soRegex="(?:http:\/\/)?(?:www.)?stackoverflow.com\/(?:(?:\w)*#!\/)?(?:users\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?";
		var lnkdRegex="(?:http:\/\/)?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:in\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?";
		var googRegex="(?:http://www\\.google\\.(?:com?\\.)?[a-z]{2,3}/(?:search)?.*?&q=\\+*([^&\"\\r\\n]+)[^\"\\r\\n]*)";
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
		else if(pageUrl.toString().match(googRegex))
		{
			this.logToConsole("Its Goog page");
			return "goog";
		
		}
	
	
		
	}
	
	this.GetSOProfiles=function(email)
	{
	
	
	
	}
	
	
	this.GetFBProfiles=function(callback, email,type)
	{
		 
		var searchQry="https://graph.facebook.com/search?q="+email+"&type="+type+"&access_token=" + this.FBAccessToken;
		
		console.log(this.FBAccessToken);
		
		$.getJSON(searchQry, function(json)
		{
			console.log("json:"+json);
			
			$.each(json.data,function(index,val)
			{
				
				console.log(val.id);
				console.log(val.name);
				var profileId=val.id;
				var profileName=val.name;
				
				var profileObject = 
				{
				    "id": profileId,
				    "name": profileName
				  
				 };
				 
				 
				 
				profileArray.push(profileObject);
				
				
				console.log(profileArray.length);
				
				
				
			});
			
			console.log(profileArray);
			
			callback(profileArray);
			
		})
		.success(function()
		{
		
			//alert('success');
		})
		.error(function()
		{
			alert('failed');
			callback(null);
		
		});
		
		
		
		
	
	
	}
	
	
	this.GetFBNameFromID=function(callback, id)
	{
	
		var searchQry="https://graph.facebook.com/"+id;
		
		$.getJSON(searchQry, function(json)
		{
			console.log(json);
			
			callback(json.name);
			
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
 
 