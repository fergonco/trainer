define([ "jquery", "verbs" ], function($, verbs) {

	var verb = verbs.getRandom();

	var divTitle = $("<div/>").appendTo("body");
	divTitle.html("Introduce las formas verbales correctas para el verbo '"
			+ verb + "'");

	var table = $("<table/>").appendTo("body");
	var row = $("<tr/>").appendTo(table);
	$("<td/>").append($("<div/>").html("ich")).appendTo(row);
	var txtIch = $("<input/>").attr("type", "text").attr("name", "ich");
	$("<td/>").append(txtIch).appendTo(row);

	row = $("<tr/>").appendTo(table);
	$("<td/>").append($("<div/>").html("du")).appendTo(row);
	var txtDu = $("<input/>").attr("type", "text").attr("name", "du");
	$("<td/>").append(txtDu).appendTo(row);

	row = $("<tr/>").appendTo(table);
	$("<td/>").append($("<div/>").html("er/sie/es")).appendTo(row);
	var txtEr = $("<input/>").attr("type", "text").attr("name", "erSieEs");
	$("<td/>").append(txtEr).appendTo(row);

	row = $("<tr/>").appendTo(table);
	$("<td/>").append($("<div/>").html("wir")).appendTo(row);
	var txtWir = $("<input/>").attr("type", "text").attr("name", "wir");
	$("<td/>").append(txtWir).appendTo(row);

	row = $("<tr/>").appendTo(table);
	$("<td/>").append($("<div/>").html("ihr")).appendTo(row);
	var txtIhr = $("<input/>").attr("type", "text").attr("name", "ihr");
	$("<td/>").append(txtIhr).appendTo(row);

	row = $("<tr/>").appendTo(table);
	$("<td/>").append($("<div/>").html("sie")).appendTo(row);
	var txtSsie = $("<input/>").attr("type", "text").attr("name", "sie");
	$("<td/>").append(txtSsie).appendTo(row);

	row = $("<tr/>").appendTo(table);
	$("<td/>").append($("<div/>").html("Sie")).appendTo(row);
	var txtSSie = $("<input/>").attr("type", "text").attr("name", "Sie");
	$("<td/>").append(txtSSie).appendTo(row);
	$("<td/>").appendTo(row);
	var btnCheck = $("<button/>").html("Corrige").appendTo(row);
	btnCheck.click(function() {
		var results = {
			ich : txtIch.val(),
			du : txtDu.val(),
			er : txtEr.val(),
			wir : txtWir.val(),
			ihr : txtIhr.val(),
			sie : txtSsie.val(),
			Sie : txtSSie.val()
		};
		console.log(results);
		var msg = verbs.checkPresent(verb, results);
		alert(msg);
	});

});