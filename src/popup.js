var miner=new SocialMiner();

function EnsureFBToken()
{

		var accessToken = chrome.extension.getBackgroundPage().getItem("accesstoken");
		console.log(JSON.parse(accessToken));
		miner.FBAccessToken=JSON.parse(accessToken);
		
			    

}

function renderContents()
{

	

}

$(document).ready(function () {
   
   var urlType;
   var profileName;
   
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
			
			
			// Get the profile name
			profileName=miner.getFBProfileName(miner.tabUrl);
			console.log("Profile:"+profileName);
			
			// Get the access token
			EnsureFBToken();
			
			if (isNaN (profileName)) 
			{
  
			    miner.GetFBProfiles(function(profileArray)
					    {
					    // error condition, fb not logged in
						if(profileArray==null)
						{
							$("#fblogin").show();
							return;
						
						}
						$("#fblogin").hide();
						
						    console.log(profileArray);
						    $.each(profileArray, function(index, profileObj)
						    {
							    console.log(profileObj);
							    var fbHtml=parseTemplate($("#FBTemplate").html(), { profile: profileObj});
							    console.log(fbHtml);
							    $(fbHtml).appendTo("#fbcontent");
						    });
						    
					    }, profileName,"user");
			    
			    
			} 
			else 
			{
				miner.GetFBNameFromID(function(name)
				{
					console.log(name);
					profileName=name;
					
					miner.GetFBProfiles(function(profileArray)
					    {
						    console.log(profileArray);
						    $.each(profileArray, function(index, profileObj)
						    {
							    console.log(profileObj);
							    var fbHtml=parseTemplate($("#FBTemplate").html(), { profile: profileObj});
							    console.log(fbHtml);
							    $(fbHtml).appendTo("#fbcontent");
						    });
						    
					    }, profileName,"user");
				
				},profileName); 
				  
			}
			
			
			
			 
	    
			
			
			
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
		   else if(urlType=="goog")
		   {
			searchQry=miner.getSearchQueryTerm(miner.tabUrl);
			console.log(searchQry);
			
			EnsureFBToken();
			
			 miner.GetFBProfiles(function(profileArray)
					    {
						// error condition, fb not logged in
						if(profileArray==null)
						{
							$("#fblogin").show();
							return;
						
						}
						$("#fblogin").hide();
						    console.log(profileArray);
						    $.each(profileArray, function(index, profileObj)
						    {
							    console.log(profileObj);
							    var fbHtml=parseTemplate($("#FBTemplate").html(), { profile: profileObj});
							    console.log(fbHtml);
							    $(fbHtml).appendTo("#fbcontent");
						    });
						    
					    }, searchQry,"user");
			    
		   
		   }
		   
	   
   });

 
   renderContents();

  
});