var request = null;
function sendPostRequestJSON(url, id) {
	request = new XMLHttpRequest();
	request.onreadystatechange = doReadyStateChange;
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	
	var messageBody = new Object();
	messageBody.action = "jsonJson";
	messageBody.id = id;
	request.send(JSON.stringify(messageBody));
}
function sendGetRequest(url, id, action) {
	var queryString = "action="+action+"&id="+id+"&dummy="+new Date().getTime();
	request = new XMLHttpRequest();
	request.onreadystatechange = doReadyStateChange;
	request.open("GET", url+"?"+queryString, true);
	request.send(null);
}
function sendPostRequest(url, id, action) {
	var queryString = "action="+action+"&id="+id;
	request = new XMLHttpRequest();
	request.onreadystatechange = doReadyStateChange;
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(queryString);
}
function processJSON(data) {
	var json = JSON.parse(data);
	if(json[0].hasMoreData) {
		$('input[name="id"]').val(json[1].id);
		$('input[name="name"]').val(json[1].name);
		$('input[name="price"]').val(json[1].price);
		$('input[name="make"]').val(json[1].make);
		$('input[name="expire"]').val(json[1].expire);
		
//		document.forms[0].id.value = json[1].id;
//		document.forms[0].name.value = json[1].name;
//		document.forms[0].price.value = json[1].price;
//		document.forms[0].make.value = json[1].make;
//		document.forms[0].expire.value = json[1].expire;
	}
	
//	var showTextNode = document.createTextNode(json[0].text);
//	var spanElement = document.getElementsByTagName("span")[0];
//	spanElement.appendChild(showTextNode);
	
	$("span:eq(0)").text(json[0].text);
}
function doReadyStateChange() {
	if(request.readyState==4) {
		if(request.status==200) {
			document.getElementsByTagName("img")[0].style.display = "none";
			processText(request.responseText);
//			processXML(request.responseXML);
//			processJSON(request.responseText);
		} else {
			console.log("Error Code:"+request.status+", "+request.statusText);
		}
	}
}
function processText(data) {
	var show = data;
	var index = data.indexOf(":");
	if(index!=-1) {
		show = data.substring(0, index);
		var temp = data.substring(index+1);
		var array = temp.split(",");
		
		$('input[name="id"]').val(array[0]);
		$('input[name="name"]').val(array[1]);
		$('input[name="price"]').val(array[2]);
		$('input[name="make"]').val(array[3]);
		$('input[name="expire"]').val(array[4]);

//		document.forms[0].id.value = array[0];
//		document.forms[0].name.value = array[1];
//		document.forms[0].price.value = array[2];
//		document.forms[0].make.value = array[3];
//		document.forms[0].expire.value = array[4];
	}
		
//	var showTextNode = document.createTextNode(show);
//	var spanElement = document.getElementsByTagName("span")[0];
//	spanElement.appendChild(showTextNode);
	
	$("span:eq(0)").text(show);
}
function processXML(dom) {
//	var show = dom.getElementsByTagName("text")[0].firstChild.nodeValue;
//	var showTextNode = document.createTextNode(show);
//	var spanElement = document.getElementsByTagName("span")[0];
//	spanElement.appendChild(showTextNode);
//	var hasMoreData = dom.getElementsByTagName("hasMoreData")[0].firstChild.nodeValue;
//	if(hasMoreData=="true") {
//		document.forms[0].id.value =
//			dom.getElementsByTagName("id")[0].firstChild.nodeValue;
//		document.forms[0].name.value =
//			dom.getElementsByTagName("name")[0].firstChild.nodeValue;
//		document.forms[0].price.value =
//			dom.getElementsByTagName("price")[0].firstChild.nodeValue;
//		document.forms[0].make.value =
//			dom.getElementsByTagName("make")[0].firstChild.nodeValue;
//		document.forms[0].expire.value =
//			dom.getElementsByTagName("expire")[0].firstChild.nodeValue;
//	}
	$("span:eq(0)").text($(dom).find("text").text());
	if($(dom).find("hasMoreData").text()=="true") {
		$('input[name="id"]').val($(dom).find("id").text());
		$('input[name="name"]').val($(dom).find("name").text());
		$('input[name="price"]').val($(dom).find("price").text());
		$('input[name="make"]').val($(dom).find("make").text());
		$('input[name="expire"]').val($(dom).find("expire").text());
	}
}