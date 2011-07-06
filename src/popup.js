var miner=new SocialMiner();

function EnsureFBToken()
{

		var accessToken = chrome.extension.getBackgroundPage().getItem("accesstoken");
		console.log(JSON.parse(accessToken));
		miner.FBAccessToken=JSON.parse(accessToken);
		
			    

}



function setupTagCloud()
{
//Setup variables
var element = $('#list a'); // all the list elements
var offset = 0;             // angle offset for animation
var stepping = 0.03;        // how fast the list rotates
var list = $('#list');      // the list wrapper
var $list = $(list);

/* Handles mouse movement, the closer to the center
the faster the list will rotate */
$list.mousemove(function(e){
    
    var topOfList = $list.eq(0).offset().top
    var listHeight = $list.height()
    
    // Sets variable that controls the speed of rotation.
    stepping = (e.clientY - topOfList) /  listHeight * 0.2 - 0.1;
    
});


/* Disperse elements evenly around the circle */
for (var i = element.length - 1; i >= 0; i--)
{
    element[i].elemAngle = i * Math.PI * 2 / element.length;
}

// call render function over and over
setInterval(render, 20);


// Handles how and where each element will be rendered.
function render(){
    
    //Steps through each element...
    for (var i = element.length - 1; i >= 0; i--){
        
        // offset adds degrees to where the element 
        // is currently on the circle
        var angle = element[i].elemAngle + offset;
        
        // Trig to figure out the size and where the
        // text should go
        x = 120 + Math.sin(angle) * 30;
        y = 45 + Math.cos(angle) * 40;
        size = Math.round(40 - Math.sin(angle) * 40);
        
        // Centers the text, instead of being left aligned.
        var elementCenter = $(element[i]).width() / 2;
        
        // Figure out the x value of the element.
        var leftValue = (($list.width()/2) * x / 100 - elementCenter) + "px"
        
        
        // Apply the values to the text
        $(element[i]).css("fontSize", size + "pt");
        $(element[i]).css("opacity",size/100);
        $(element[i]).css("zIndex" ,size);
        $(element[i]).css("left" ,leftValue);
        $(element[i]).css("top", y + "%");
    }
    
    // Rotate the circle
    offset += stepping;
}
    
    


}
function onLinkedInLoad() 
{
     IN.Event.on(IN, "auth", onLinkedInAuth);
}

function onLinkedInAuth() 
{
     IN.API.Profile("me").result(displayProfiles);
}
 
function displayProfiles(profiles)
{
     member = profiles.values[0];
     document.getElementById("#lkndTab").innerHTML = 
          "<p id=\"" + member.id + "\">Hello " +  member.firstName + " " + member.lastName + "</p>";
}
 
function mineprofiles(event)
{
console.log(this.text);
var str=this.text;
mineFBProfilesByName(str);
mineSOProfilesByName(str);


}


function mineSOProfilesByName(profileName)
{
miner.GetSOProfiles(function(profileArray)
					    {
					    // error condition, fb not logged in
						if(profileArray==null)
						{
							//$("#fblogin").show();
							return;
						
						}
						//$("#fblogin").hide();
						
						    console.log(profileArray);
						    $.each(profileArray, function(index, profileObj)
						    {
							    console.log(profileObj);
							    var fbHtml=parseTemplate($("#SOTemplate").html(), { profile: profileObj});
							    //console.log(fbHtml);
							    $(fbHtml).appendTo("#socontent");
						    });
						    
					    }, profileName,"user");


}



function mineFBProfilesByName(profileName)
{

	// Get the access token
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
							    //console.log(fbHtml);
							    $(fbHtml).appendTo("#fbcontent");
						    });
						    
					    }, profileName,"user");

$("#parenttabs" ).tabs("select",1);
$( "#tabs" ).tabs("select", 2);

}


$(document).ready(function () {
   
   var urlType;
   var profileName;
   
    $("#tabs" ).tabs();
    $("#parenttabs" ).tabs();
    
    var keywords = chrome.extension.getBackgroundPage().getItem("keywords");
    
    var kjos=JSON.parse(keywords);
    var kjos1=JSON.parse(kjos);
    console.log(kjos1);
   
    // clear the list
    $("#list ul").text("");
    
    // Add the keywords into list
    $.each(kjos1, function(i, str)
    {
    	
    	$("#list ul").append("<li><a href=\"#\" class=\"keyword\">"+str+"</a></li>");
    
    });
    
    setupTagCloud();
    
    $(".keyword").click(mineprofiles);
    

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


  
});
