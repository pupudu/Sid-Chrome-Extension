document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
 
    chrome.tabs.getSelected(null, function(tab) {
      d = document;
 
      var f = d.createElement('form');
      f.action = 'https://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
	  
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
	  if(i.value.includes("facebook")){
		
		/*chrome.tabs.duplicate(tab.id);*/
		chrome.tabs.executeScript(tab.id,{
			code:'var x=10;x'
		  },function(d){
			var str=document.getElementsByClassName("_c24 _50f3").innerHTML;
			alert(str);
		  });
		  /*chrome.tabs.executeScript(tab.id,function(){
			 document.body.style.backgroundColor="red"
		  });*/
	  }else{
		alert("Incorrect Page");
	  }
	  
	  /*
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();*/
    });
	
	
  }, false);
  chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red";alert("dodan");'
  });
});
}, false);
