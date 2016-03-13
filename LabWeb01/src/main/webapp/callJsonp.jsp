<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
function doClick1() {
	var url = "http://localhost:7080/JsonpWeb/demo/jsonp.view";
	var queryString = "data="+Math.floor(Math.random()*100)+"&callback=processReslt";
	var scriptElementNode = document.createElement("script");
	scriptElementNode.type = "text/javascript";
	scriptElementNode.src = url+"?"+queryString;
	document.getElementsByTagName("head")[0].appendChild(scriptElementNode);
}
function processReslt(data) {
	var element = document.getElementById("data1");
	element.innerHTML = data;
}
var request = null;
function doClick0() {
	var url = "/LabWeb01/demo/jsonp.view";
	var queryString = "data="+Math.floor(Math.random()*100);
	request = new XMLHttpRequest();
	request.onreadystatechange = doReadyStateChange;
	request.open("GET", url+"?"+queryString);
	request.send(null);
}
function doReadyStateChange() {
	if(request.readyState==4) {
		if(request.status==200) {
			var element = document.getElementById("data0");
			element.innerHTML = request.responseText;
		} else {
			console.log("Error Code:"+request.status+", "+request.statusText);
		}
	}
}
</script>
</head>
<body>
<h3>
	<input type="button" value="Call JsonServlet with XMLHttpRequest" onclick="doClick0()">
	<div id="data0"></div>
</h3>
<h3>
	<input type="button" value="Call JsonServlet with JSONP" onclick="doClick1()">
	<div id="data1"></div>
</h3>


</body>
</html>