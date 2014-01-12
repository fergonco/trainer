define([ "jquery", "message-bus", "mustache" ], function($, bus, mustache) {

	var getArticle = function(gender) {
		return (gender == "masculin") ? //
		"der" : // 
		(gender == "femenin") ? "die" : (gender == "neuter") ? "das" : null;
	};

	var check = function(noun, testGender) {
		var article = getArticle(noun.gender);
		if (noun.gender == testGender) {
			alert("bien! -> " + article + " " + noun.name);
			bus.send("good-gender", noun);
		} else {
			alert("incorrecto -> " + article + " " + noun.name);
			bus.send("bad-gender", noun);
		}
	};

	return {
		newQuestion : function(div, noun) {
			var template = "<div class='question'><b>{{noun}}</b>:&nbsp;{{translation}}</div>" + //
			"<button id='der'>der</button>" + //
			"<button id='die'>die</button>" + //
			"<button id='das'>das</button>" + //
			"<button id='unknown'>No sé</button>";
			var content = mustache.render(template, {
				noun : noun.name,
				translation: noun.translation
			});
			div.append(content);
			$("#der").click(function() {
				check(noun, "masculin");
			});
			$("#die").click(function() {
				check(noun, "femenin");
			});
			$("#das").click(function() {
				check(noun, "neuter");
			});
			$("#unknown").click(function() {
				alert(getArticle(noun.gender) + " " + noun.name);
				bus.send("bad-gender", noun);
			});
		}
	};

});