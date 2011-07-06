var keywordsArray=new Array();
console.log("keywords page");
console.log(keywordsArray);
var keywords={

	f1:function()
	{
		var h= $('meta[name=author]').attr("content");
		return $.makeArray(h);
	},

	f2:function()
	{
		var h= $('meta[name=ShortTitle]').attr("content");
		
		return $.makeArray(h);
	},
	
	f3:function()
	{
		 var elems=["h1","h2"];
		 var harr=new Array();
		 $.each(elems, function(index, hi)
		 {
		 
			 var h1=$(elems[index]);
			 
			 $.each(h1, function(i, helement)
			 {
			 	harr.push($(helement).text().trim());
			 
			 });
			 console.log(harr.length);
		 
		 });
		 return harr;
	}

}

$.each(keywords, function(i, func)
{
	var keywordarr=func();
	if(keywordarr!=null)
	{
		console.log(keywordarr);
		$.each(keywordarr, function(i, str)
		{
			//console.log("str:"+str);
			if(str!=null)
			{
		
				keywordsArray.push(str);
			}
		});
	}
	


});

// Message passing to background page
	chrome.extension.sendRequest({message: "setKeywords", keywords: keywordsArray}, function() 
	{
		console.log(keywordsArray);
		console.log("message sent");
	  // The data has been sent, we can close the window now.
	  //window.close();
	});

