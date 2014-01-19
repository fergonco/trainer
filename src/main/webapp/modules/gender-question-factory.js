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
			var template = "<div class='question'><b>{{noun}}</b>:&nbsp;{{translation}}" + //
			"<button id='gender-change-word' class='edit-button'>Editar</button></div>" + //
			"<button id='der' class='exercise-button'>der</button>" + //
			"<button id='die' class='exercise-button'>die</button>" + //
			"<button id='das' class='exercise-button'>das</button>" + //
			"<button id='unknown' class='exercise-button'>No sé</button>";
			var content = mustache.render(template, {
				noun : noun.name,
				translation : noun.translation
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
			$("#gender-change-word").click(function() {
				bus.send("new-word", noun);
			});
		}
	};

});